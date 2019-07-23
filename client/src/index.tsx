import React from 'react';
import ReactDOM from 'react-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Our modules
import {LoginForm, RegisterForm} from './loginForm';

// Packages for using ACE Editorimport React from 'react';
import { render } from 'react-dom';
import * as ace from 'brace';

import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';


import './index.css';
import Nav from 'react-bootstrap/Nav';


interface ExistingFile {
    kind: "exists";
    name: string;
    editSession: Document;
}

interface UnsavedFile {
    kind: "unsaved";
    id: number;
}

type File = ExistingFile | UnsavedFile;
type Files = File[];

interface KeyProp {
    key: string;
}

interface EmptyProp {
}

interface FileProp {
    files: Files;
}

interface FilePaneState {
    list: string[];
}

interface EditorProp {
    files: Files;
    unsaved: string[];
    onNewTab: any;
    onCloseTab: any;
}

interface EditorState {
    files: Files;
    unsaved: string[];
    numUnsaved: number;
}



class FilePane extends React.Component<EmptyProp, FilePaneState> {
    constructor(props: EmptyProp) {
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        const params = {problem: 'hello', language: 'bye'};
        const urlParams = new URLSearchParams(Object.entries(params));

        fetch("/api/getList" + "?" + urlParams)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    list: result,
                });
            }
        )
    }

    render () {
        return (
        this.state.list.map((item) => {
            return(
                <div>{item}</div>
            );
        })
        );
    }
}

// TODO refactor into a function because it doesn't need to store any state
class EditorTabs extends React.Component<EditorProp, KeyProp> {
    constructor(props: EditorProp, context: any) {
        super(props, context);
        this.state = {
            key: 'tab-1',
        };
    }

    /**
     * Relies on onNewTab() appending to the end of the list
     * @param key 
     */
    tabControl(key: string) {
        console.log(key);
        if (key == "tab-new") {
            let newFile = this.props.onNewTab();
            this.setState({ key: this.tabKey(newFile) });
            //his.render();
            return;
        } else {
            this.setState({ key });
        }
    }

    tabLabel(file: File, i: number): string {
        switch (file.kind) {
            case "exists": return file.name;
            case "unsaved": return "Untitled-" + file.id;
        };
    }

    tabKey(file: File): string {
        switch (file.kind) {
            case "exists": return "tab-" + file.name;
            case "unsaved": return "tab-untitiled" + file.id; 
        }
    }

    /**
     * MUST MATCH EVENTKEY with renderTabPane
     * @param file 
     * @param i 
     */
    renderTab(file: File, i: number) {
        let key = this.tabKey(file);
        return (
            <Nav.Item key={key}>
                <Nav.Link eventKey={key}>{this.tabLabel(file, i)}
                    <Button onClick={this.props.onCloseTab(i)}>x</Button>
                </Nav.Link>
            </Nav.Item>
        );
    }

    /**
     * Must match eventKey with renderTab
     */
    renderTabPane(file: File, i: number) {
        let key = this.tabKey(file);
        return (
            <Tab.Pane key={key} eventKey={key}>
                <AceEditor
                    mode="java"
                    theme="github"
                    name={"editor-tab-" + i}
                    editorProps={{ $blockScrolling: true }}
                    onLoad={editor => console.log(editor.session)}
                />
            </Tab.Pane>
        );
    }


    renderTabs() {
        return this.props.files.map((file, idx) => this.renderTab(file, idx));
    }

    renderTabPanes() {
        return this.props.files.map((file, idx) => this.renderTabPane(file, idx));
    }

    render() {
        return (
            <Tab.Container defaultActiveKey="tab-0"
                activeKey={this.state.key}
                onSelect={((key: string) => this.tabControl(key)).bind(this)}>
                <Row>
                    <Nav variant="tabs" className="flex-row">
                        {this.renderTabs()}
                        <Nav.Item>
                            <Nav.Link eventKey="tab-new">New Tab</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <Row>
                    <Tab.Content>
                        {this.renderTabPanes()}
                    </Tab.Content>
                </Row>
            </Tab.Container>
        );
    }
}

class Editor extends React.Component<EmptyProp, EditorState> {
    constructor(props: EmptyProp) {
        super(props);
        this.state = {
            files: [], // An association list of filenames and Option[Tuple[tab ID, editor sessions]
            unsaved: ["Untitled 1", "Untitled 2"], // An association list of tab ID's and editor sessions
            numUnsaved: 1,
        }

    }

    newTab() {
        let newFile: UnsavedFile = { kind: "unsaved", id: this.state.numUnsaved };
        this.setState({
            files: this.state.files.concat([newFile]),
            numUnsaved: this.state.numUnsaved + 1,
        });
        return newFile;
    }

    closeTab(i: number) {
        return ((e: React.MouseEvent<HTMLInputElement>) => {
            var files = this.state.files.slice();
            files.splice(i, 1);
            this.setState({
                files: files,
            });
            e.stopPropagation(); //TODO
        }
        );
    }

    render() {
        return (
            <div className="editor">
                <LoginForm/>
                <RegisterForm/>
                <FilePane />
                <EditorTabs
                    files={this.state.files}
                    unsaved={this.state.unsaved}
                    onNewTab={() => this.newTab()}
                    onCloseTab={this.closeTab.bind(this)}
                />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Editor />,
    document.getElementById('root')
);