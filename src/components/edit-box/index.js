import React from 'react'
import './style.css'
import { get, post, postFormData } from '../../utils/networking'
import FileDropZone from '../common/fileDropZone'
import { BASE_API } from '../../constants/appSettings'
import IconTable from '../common/IconTable'
class EditBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            componentCatch: {},
            isOpen: false,
            id: 0,
            name: "",
            title: "",
            url: "",
            isSaving: false,
            isUploadding: false,
            parentId: 0,
            group: "",
            description: "",
            photo: ""
        }
    }
    componentDidMount() {
        window.addEventListener("update-component", () => {
            var id = window.sessionStorage.getItem("current-component-id")
            get("admin/api/components/get/" + id, result => {
                this.setState({ ...result, isOpen: true, componentCatch: result })
            })

        })
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    onAddPhoto(file) {
        this.setState({
            isUploadding: true
        })
        var file = file[0]

        this.getBase64(file).then(
            data => {
                data = data.replace("data:image/png;base64,", "");
                let param = {
                    value: data
                }
                post("admin/api/upload/base64", param, result => {
                    if (result)
                        this.setState({
                            photo: result.relativePath,
                            isUploadding: false
                        })
                })
            }
        );



    }

    onRemovePhoto() {
        this.setState({
            relativePath: ""
        })
    }

    handleSave() {
        let param = {
            id: this.state.id,
            name: this.state.name,
            title: (this.state.title) ? (this.state.title) : this.state.componentCatch.title,
            description: (this.state.description) ? this.state.description : this.state.componentCatch.description,
            url: (this.state.url) ? this.state.url : this.state.componentCatch.url,
            photo: (this.state.photo) ? this.state.photo : this.state.componentCatch.photo,
            parentId: null
        }
        post("admin/api/components/update", param, result => {
            this.setState({
                isOpen: false
            })
            window.location.reload();
        })
    }

    render() {
        const {
            isOpen,
            name,
            title,
            url,
            description,
            isSaving,
            photo,
            componentCatch
        } = this.state

        if (!isOpen)
            return <div></div>

        return (
            <div className="edit-box">
                <div className="contain">
                    <div className="header">
                        <span>Edit {name}</span>
                        <i className="fa fa-times" onClick={() => this.setState({ isOpen: false })}></i>
                    </div>
                    <div className="content">
                        {
                            (componentCatch.title) ? <div>
                                <label>Title</label>
                                <textarea type="text" placeholder="Title" value={title} onChange={(e) => this.setState({ title: e.target.value })} />
                            </div> : ""
                        }
                        {
                            (componentCatch.description) ? <div>
                                <label>Description</label>
                                <textarea type="text" placeholder="Description" value={description} onChange={(e) => this.setState({ description: e.target.value })} style={{ minHeight: "100px" }} />
                            </div> : ""
                        }
                        {

                            (componentCatch.url) ? <div>
                                <label>Link</label>
                                <textarea type="text" placeholder="Url" value={url} onChange={(e) => this.setState({ url: e.target.value })} />
                            </div> : ""
                        }
                        {
                            (
                                componentCatch.group == "top-slider" ||
                                componentCatch.group == "clound-banner" ||
                                componentCatch.name == "service-item-custom" ||
                                componentCatch.name == "image"
                            ) ? (
                                    (componentCatch.photo) ? <div>
                                        <label>Image</label>
                                        <FileDropZone
                                            isUploadding={this.state.isUploadding}
                                            domainUrl={BASE_API}
                                            initFiles={[photo]}
                                            onAdd={this.onAddPhoto.bind(this)}
                                            onRemove={this.onRemovePhoto.bind(this)} />
                                    </div> : ""
                                ) : (
                                    (componentCatch.photo) ? <div>
                                        <label>Icon</label>
                                        <IconTable
                                            icon={photo}
                                            handleSelectIcon={(value) => this.setState({ photo: value })}
                                        />

                                    </div> : ""
                                )
                        }
                    </div>
                    <div className="footer">
                        <span className="edit_bt_cancel" onClick={() => this.setState({ isOpen: false })}>Cancel</span>
                        <span className="edit_bt_save" onClick={() => this.handleSave()}> {(isSaving) ? "Saving..." : "Save"}</span>
                    </div>
                </div>
            </div >
        )
    }
}
export default EditBox