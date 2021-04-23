import * as React from 'react';
import Editor from './editor/Editor';
import Ribbon from './ribbon/Ribbon';
import { getAllPluginArray, getPlugins } from './plugins';

const styles = require('./MainPane.scss');

export interface PopoutMainPaneProps {
    content: string;
}

export default class PopoutMainPane extends React.Component<PopoutMainPaneProps, {}> {
    private editor = React.createRef<Editor>();

    render() {
        let plugins = getPlugins();

        return (
            <div className={styles.mainPane}>
                <Ribbon
                    plugin={plugins.ribbon}
                    className={styles.noGrow}
                    ref={plugins.ribbon.refCallback}
                />
                <div className={styles.body}>
                    <Editor
                        plugins={getAllPluginArray(true /*showSidePane*/)}
                        className={styles.editor}
                        initState={plugins.editorOptions.getBuildInPluginState()}
                        content={this.props.content}
                        ref={this.editor}
                        snapshotService={plugins.snapshot.getSnapshotService()}
                    />
                </div>
            </div>
        );
    }

    getContent() {
        return this.editor.current.getContent();
    }
}
