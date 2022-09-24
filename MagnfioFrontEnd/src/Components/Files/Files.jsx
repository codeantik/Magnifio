import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Upload, message } from "antd";
const { Dragger } = Upload;
import { CloudUploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import S3FileUpload from 'react-s3';
import { v4 as uuidv4 } from 'uuid';
// import './files.css';
import './filesDark.css';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	height: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 10,
};

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
}

export default function Files() {
	const [open, setOpen] = useState(false);
    const [file, setFile] = useState([]);
    const [currentFile, setCurrentFile] = useState();
    
	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

    const handleFileInput = (e) => {
        setFile([...file, e.target.files[0]])
        setCurrentFile({ filename: e.target.files[0].name, type: e.target.files[0].type })
    }

    const handleUpload = () => {
        let date = new Date().toISOString().slice(0, 10)
   
        const filename = 
        `${currentFile.filename.split(".")[0]}--${date}--${'magnifio'}--${uuidv4()}.${currentFile.type.split('/')[1]}`;

        const updatedFile = new File(file, filename);
    
        console.log(file)
        S3FileUpload.uploadFile(updatedFile, config)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };

    // const handleUpload = async (e) => {
    //     e.preventDefault();
    //     const data = new FormData()
    //     data.append('files', uploadedFile)
    //     console.log(data)
    //     await axios.post('http://54.174.6.76:8080/upload', data)
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    //     message.success('File uploaded successfully!');
    //     setOpen(false)
    // }

	const props = {
		customRequest({ file, onSuccess }) {
			console.log(file, onSuccess);
			setTimeout(() => {
				onSuccess("ok");
			}, 1000);
		},

		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
				setUploadedFile(info.file);
			}
			if (status === "done") {
				message.success(`Loading ${info.file.name} ...`);
			} else if (status === "error") {
				message.error(`Loading failed!`);
			}
		},

		onDrop(e) {
			console.log("Loading dropped file ...", e.dataTransfer.files);
			setFile([...file, e.dataTransfer.files[0]])
            setCurrentFile(
                {   
                    filename: e.dataTransfer.files[0].name, 
                    type: e.dataTransfer.files[0].type
                }
            )
		},
	};

  return (
        <div className="modal-container">
            <button 
                onClick={handleOpen} 
                className="upload-btn" 
                style={{ background: '#007090', padding: '5px 20px', 
                    margin: '10px', color: '#fff', borderRadius: '5px'}}
            >
                New
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                className='modal'
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <button onClick={handleUpload} style={{ marginBottom: '10px', marginTop: '-50px', marginLeft: '37%', outline: 'none', background: '#2f6e8c', color: 'white', width: '25%', padding: '5px', borderRadius: '10px'}}>Upload</button>
                    <Dragger {...props} className='dragger'>
                        <p className="ant-upload-drag-icon">
                            <CloudUploadOutlined style={{ fontSize: '100px', color: '#5e99d0' }}/>
                        </p>
                        <p className="ant-upload-text">Drag and Drop your File</p>
                        <button 
                            style={{ all: 'none', background: '#2f6e8c', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                        >
                            Click to Browse
                        </button>
                    </Dragger> */}
                    <input type="file" onChange={handleFileInput}/>
                    <button onClick={handleUpload}> Upload </button>
                </Box>
            </Modal>
        </div>
    );
  }
