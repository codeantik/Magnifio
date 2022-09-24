import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css'; // or
import emailContext from '../../../context/emails/emailContext';
// import './email.css';
import './emailDark.css';
import emailDark from '../../../images/email.png';

export default function Email() {

  const [modal2Visible, setModal2Visible] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');
  const { emails } = useContext(emailContext)
  

  const handleCancelModal = (data) => {
    setIframeSrc('');
    setModal2Visible(data);
  };

  const handleEmailsClick = (srcdoc) => {
    setIframeSrc(srcdoc);
    setModal2Visible(true);
  };

  return (
    <div className="email-body">
      {emails.map((email, index) => {
        let trimmedEmail = email.from.split('<')
        return (
          <div
            key={email.id}
            className="email-inbox-info"
            onClick={() => handleEmailsClick(email.payload)}
          >
            <div className="email-user-logo">
              <img
                // src="https://i.ibb.co/j3NcRcc/slack.png"
                src={emailDark}
                alt="user_profile"
              />
            </div>
            <div className="email-sender-info">
              <div className="sender-username">
                <h5>{trimmedEmail[0]}</h5>
              </div>
              <div className="email-subject">
                {email.subject}
              </div>
              <div className="email-snippets">
                <p>{email.snippet} + {'...'}</p>
              </div>
            </div>
            <div className="email-date">
              <p>07/1/2022</p>
            </div>
          </div>
        );
      })}
      <Modal
        width={'55%'}
        footer={null}
        centered
        visible={modal2Visible}
        onCancel={() => handleCancelModal(false)}
        className="email-modal"
      >
        <iframe
          srcDoc={iframeSrc}
          width="100%"
          height="500"
          className="email-body-data"
        />
      </Modal>
    </div>
  );
}
