// import './history.css';
import './historyDark.css';
import Files from '../Files/Files'
import React, { useState } from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUpload from '../Files/FileUpload';

export default function History() {

    const [showUpload, setShowUpload] = useState(false);

    const data = [
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},
        {fileName: 'file1.txt', owner: 'xyz_name', fileSize: '1.5MB', uploadDate: '01/01/2019'},

    ]


    const handleShowUpload = () => {
        setShowUpload(!showUpload);
    }

    return (
        <div className="history-container">
            {/* <div className="history-btn">
                <button className="history-btn-text" onClick={handleShowUpload}>{showUpload ? 'History' : 'Upload'}</button>
            </div> */}
            <Files showUpload={showUpload} />
            {/* <FileUpload /> */}
            <div className="history-table">
                <div className="history-table-heading">
                    <p>File Name</p>
                    <p>Owner</p>
                    <p>File Size</p>
                    <p>Upload Date</p>
                </div>
                <div className="history-table-container">
                    {data.map((item, index) => (
                        <div className="history-table-row" key={index}>
                            <p>
                                <span><DescriptionOutlinedIcon className="file-icon" /></span>
                                <span>{item.fileName}</span>
                            </p>
                            <p>{item.owner}</p>
                            <p>{item.fileSize}</p>
                            <p>{item.uploadDate}</p>
                        </div>
                    ))}
                </div>
        </div>
        </div>
    )
}
