import React, {useState} from 'react';
import S3FileUpload from 'react-s3';
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const ACL = process.env.REACT_APP_ACL;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    ACL: ACL,
}

const FileUpload = () => {

    const [file, setFile] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);

    const handleFileInput = (e) => {
        setFile([...file,e.target.files[0]])
        setCurrentFile({ filename: e.target.files[0].name, type: e.target.files[0].type})
    }

    const handleUpload = () => {
        let date = new Date().toISOString().slice(0, 10)
        let name = currentFile.filename.split('.')
        const filename = `${name[0]}--${date}--${"magnifio"}--${uuidv4()}.${name[1]}`;
    
        const updatedfile = new File(file,filename);
    
        S3FileUpload.uploadFile(updatedfile, config)
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      };

    return (
        <div>
            <div>React S3 File Upload</div>
            <input type="file" onChange={handleFileInput}/>
            <button onClick={handleUpload}> Upload to S3</button>
        </div>
    )
}

export default FileUpload;