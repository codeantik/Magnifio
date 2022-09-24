import React from 'react';
import './Dashboard.css';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TagIcon from '@mui/icons-material/Tag';
export default function Dashboard() {
  return (
    <div className="dashboard-wrap">
      <div>
        <CCard>
          <CCardHeader className="dashboard-head">today's Schedule</CCardHeader>
          <CCardBody>
            <CCardTitle>Special title treatment</CCardTitle>
            <CCardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
            <CButton href="#" className="dashboard-btn">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader className="team-board">Team notification board</CCardHeader>
          <CCardBody>
            <CCardTitle>Special title treatment</CCardTitle>
            <CCardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
            <CButton href="#" className="dashboard-btn">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader className="notification-board">
            General notification board
          </CCardHeader>

          <CCardBody>
            <CCardText className="notification-data">
              <NotificationsActiveIcon /> new message from your team
            </CCardText>
            <CCardText className="notification-data">
              <NotificationsActiveIcon />
              new task available!!
            </CCardText>
        <CCardText className="notification-data"><NotificationsActiveIcon /> your task was not compeleted
            </CCardText>
        <CCardText className="notification-data"><NotificationsActiveIcon /> your task was not compeleted
          </CCardText>
            <CButton href="#" className="dashboard-btn">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader className="tagged">Tagged In</CCardHeader>
          <CCardBody>
            <CCardText className="tag-data">
              <TagIcon/> <span className="dashboard-span">ankit</span> tagged you in there post
            </CCardText>
            <CCardText className="tag-data">
             <TagIcon/> <span className="dashboard-span">john</span> tagged you in comment
            </CCardText>
            <CCardText className="tag-data">
             <TagIcon/> <span className="dashboard-span">mohit</span> tagged you in story

              </CCardText>
            <CButton href="#" className="dashboard-btn">show more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader className="tagged">Tagged In</CCardHeader>
          <CCardBody>
            <CCardText className="tag-data">
              <TagIcon/> <span className="dashboard-span">ankit</span> tagged you in there post
            </CCardText>
            <CCardText className="tag-data">
             <TagIcon/> <span className="dashboard-span">john</span> tagged you in comment
            </CCardText>
            <CCardText className="tag-data">
             <TagIcon/> <span className="dashboard-span">mohit</span> tagged you in story

              </CCardText>
            <CButton href="#" className="dashboard-btn">show more</CButton>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}
