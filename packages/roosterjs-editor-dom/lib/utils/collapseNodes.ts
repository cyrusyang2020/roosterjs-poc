import contains from './contains';
import splitParentNode from './splitParentNode';
import toArray from './toArray';

/**
 * Collapse nodes within the given start and end nodes to their common ascenstor node,
 * split parent nodes if necessary
 * @param root The root node of the scope
 * @param start The start node
 * @param end The end node
 * @param canSplitParent True to allow split parent node there are nodes before start or after end under the same parent
 * and the returned nodes will be all nodes from start trhough end after splitting
 * False to disallow split parent
 * @returns When cansplitParent is true, returns all node from start through end after splitting,
 * otherwise just return start and end
 */
export default function collapseNodes(
    root: Node,
    start: Node,
    end: Node,
    canSplitParent: boolean
): Node[] {
    if (!contains(root, start) || !contains(root, end)) {
        return [];
    }

    start = collapse(root, start, end, true /*isStart*/, canSplitParent);
    end = collapse(root, end, start, false /*isStart*/, canSplitParent);

    if (contains(start, end, true /*treateSameNodeAsContain*/)) {
        return [start];
    } else if (contains(end, start)) {
        return [end];
    } else if (start.parentNode == end.parentNode) {
        let nodes: Node[] = toArray(start.parentNode.childNodes);
        let startIndex = nodes.indexOf(start);
        let endIndex = nodes.indexOf(end);
        return nodes.slice(startIndex, endIndex + 1);
    } else {
        return [start, end];
    }
}

/**
 * Collapse a node by traversing its parent nodes until we get the common ancestor node of node and ref node
 * @param root Root node, traversing will be limited under this scope
 * @param node The node to collapse
 * @param ref Ref node. The result will be the nearest common ancestor node of the given node and this ref node
 * @param isStart Whether the given node is start of the sequence of nodes to collapse
 * @param canSplitParent Whether splitting parent node is allowed
 * @returns The common ancestor node of the given node ref node
 */
export function collapse(
    root: Node,
    node: Node,
    ref: Node,
    isStart: boolean,
    canSplitParent: boolean
): Node {
    while (node.parentNode != root && !contains(node.parentNode, ref)) {
        if ((isStart && node.previousSibling) || (!isStart && node.nextSibling)) {
            if (!canSplitParent) {
                break;
            }
            splitParentNode(node, isStart);
        }
        node = node.parentNode;
    }
    return node;
}
