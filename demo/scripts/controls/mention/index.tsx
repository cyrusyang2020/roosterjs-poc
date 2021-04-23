import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EditorPlugin, IEditor, PluginEvent, Rect } from 'roosterjs-editor-types';
import debounce from 'lodash/debounce';
import { getPositionRect } from 'roosterjs-editor-dom';
import Picker, { IItem } from './Picker';
import { replaceWithNode } from 'roosterjs-editor-api';

export default class MentionPlugin implements EditorPlugin {
    private triggerString = '[[';
    private editor: IEditor;
    private mountPoint: HTMLElement;
    private variables: IItem[] = new Array(5).fill(null).map((o, i) => ({ key: `variable-id-${i}`, label: `variable-name-${i}` }));
    private trigger = debounce(
        () => {
            const position = this.editor.getFocusedPosition();
            if (!position?.node) return;
            if (
                position.node.textContent.substr(
                    position.offset - this.triggerString.length,
                    this.triggerString.length
                ) !== this.triggerString
            ) {
                if (position.element.nodeName === 'SEISMIC-VARIABLE') return;
                console.log('trigger', position)
                this.updateRender(false);
                return;
            }
            this.updateRender(true, getPositionRect(position));
            console.log(123123);
        },
        300,
        { trailing: true }
    );

    insertVariable = (item: IItem) => {
        console.log('item', item);
        const document = this.editor.getDocument();
        const seismicVariableTag: HTMLUnknownElement = document.createElement('seismic-variable');
        seismicVariableTag.setAttribute('name', item.key);
        seismicVariableTag.contentEditable = "false";
        seismicVariableTag.innerText = `[[${item.label}]]`;

        this.insertNode(seismicVariableTag);
        this.updateRender(false);
    }
    onVariableClick = () => {
        const position = this.editor.getFocusedPosition();
        if (position.element.nodeName !== 'SEISMIC-VARIABLE') return;
        console.log('position', position)
        this.editor.select(position.node, position.node.textContent.length)
        this.updateRender(true, getPositionRect(position), true)
    }
    replaceVariable = (item: IItem) => {
        const position = this.editor.getFocusedPosition();
        this.editor.addUndoSnapshot(() => {
            position.element.setAttribute('name', item.key);
            position.element.innerText = `[[${item.label}]]`;
        })
        this.updateRender(false);
    }

    updateRender(visible: boolean, rect?: Rect, isReplace?: boolean) {
        if (visible) {
            ReactDOM.render(<Picker items={this.variables} rect={rect} onClick={isReplace ? this.replaceVariable : this.insertVariable} />, this.mountPoint);
        } else {
            ReactDOM.unmountComponentAtNode(this.mountPoint);
        }
    }


    getName() {
        return 'Mention';
    }

    initialize(editor: IEditor) {
        this.editor = editor;
        const document = this.editor.getDocument();
        this.mountPoint = document.createElement('section');
        document.body.appendChild(this.mountPoint);
    }

    dispose() {
        this.editor = null;
        if (this.mountPoint) {
            ReactDOM.unmountComponentAtNode(this.mountPoint);
        }
    }

    insertNode(htmlNode: Node, replaceString = this.triggerString) {
        this.editor.focus();

        let insertNode = () => {
            replaceWithNode(
                this.editor,
                replaceString,
                htmlNode,
                true /* exactMatch */
            );
            // this.editor.insertNode(htmlNode);
        };

        this.editor.addUndoSnapshot(
            insertNode,
            'MENTION_PICKER'
        );
    }
    onPluginEvent(event: PluginEvent) {
        const evt: PluginEvent & {
            rawEvent: Event;
        } = event as PluginEvent & {
            rawEvent: Event;
        };
        if (evt.rawEvent instanceof KeyboardEvent) {
            this.trigger();
        } else if (evt.rawEvent instanceof MouseEvent) {
            if (evt.rawEvent.type === 'mouseup') {
                this.onVariableClick();
            }
        }
        console.log('event', event)

    }
    getContextMenuItems(node: Node) {
        const items: any[] = [];
        for (let i = 0; i < 10; i++) {
            items.push({
                key: `variable-id-${i}`,
                name: `variable ${i}`,
                onClick: () => {
                    console.log('editor', this.editor);
                },
            });
        }
        return items;
    }
}
