// import { ContextMenuProvider, IEditor, PluginEvent } from 'roosterjs-editor-types';
// import debounce from 'lodash/debounce';
// import { ContextMenuItem } from './ContextMenuProvider';

// export default class RotateImagePlugin implements ContextMenuProvider<ContextMenuItem> {
//     private triggerString = '[[';
//     private editor: IEditor;
//     private trigger = debounce(
//         () => {
//             const selection = this.editor.getFocusedPosition();
//             if (!selection?.node) return;
//             if (
//                 selection.node.textContent.substr(
//                     selection.offset - this.triggerString.length,
//                     this.triggerString.length
//                 ) !== this.triggerString
//             ) {
//                 return;
//             }

//             console.log(123123);
//         },
//         300,
//         { trailing: true }
//     );

//     getName() {
//         return 'Mention';
//     }

//     initialize(editor: IEditor) {
//         this.editor = editor;
//     }

//     dispose() {
//         this.editor = null;
//     }

//     onPluginEvent(event: PluginEvent) {
//         // const searcher = this.editor.getContentSearcherOfCursor(event);
//         // if (!searcher) return;
//         // let startPosition: NodePosition;
//         // let endPosition: NodePosition;
//         // let triggerString = '[[';
//         // searcher?.forEachTextInlineElement(textInlineElement => {
//         //     if (endPosition && startPosition) {
//         //         return true;
//         //     }
//         //     const inlineTextContent = textInlineElement.getTextContent();
//         //     console.log('inlineTextContent', inlineTextContent);
//         //     // special case for immediately preceeding character being whitespace
//         //     if (inlineTextContent.endsWith(triggerString)) return false;

//         //     if (!endPosition) {
//         //         endPosition = textInlineElement.getStartPosition().move(inlineTextContent.length);
//         //     }
//         //     if (inlineTextContent.startsWith(triggerString)) {
//         //         startPosition = textInlineElement.getStartPosition();
//         //     } else {
//         //         // let contentIndex = inlineTextContent.length - 1;
//         //         let contentIndex = inlineTextContent.indexOf(triggerString);
//         //         if (contentIndex < 0) return false;
//         //         startPosition = textInlineElement.getStartPosition().move(contentIndex);
//         //         return true;
//         //         // for (; contentIndex > 0; contentIndex--) {
//         //         //     if (startPosition) {
//         //         //         return true;
//         //         //     }
//         //         //     if (
//         //         //         inlineTextContent[contentIndex] == triggerCharacter &&
//         //         //         inlineTextContent[contentIndex - 1].trim().length == 0
//         //         //     ) {
//         //         //         startPosition = textInlineElement.getStartPosition().move(contentIndex);
//         //         //         return true;
//         //         //     }
//         //         // }
//         //     }
//         // });
//         this.trigger();
//         // console.log('startPosition', startPosition, endPosition);

//         // searcher.getRangeFromText
//     }
//     getContextMenuItems(node: Node) {
//         const items: ContextMenuItem[] = [];
//         for (let i = 0; i < 10; i++) {
//             items.push({
//                 key: `variable-id-${i}`,
//                 name: `variable ${i}`,
//                 onClick: () => {
//                     console.log('editor', this.editor);
//                 },
//             });
//         }
//         return items;
//     }
// }
