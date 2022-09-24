import React from 'react';
import './Analytics.css';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react';
import User from './User'
import 'bootstrap/dist/css/bootstrap.min.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function Dashboard() {
  return (
    <div className="bk">
      <div>
        <CCard>
          <CCardHeader component="h5">Trending Topics</CCardHeader>
          <CCardBody>
            <CCardText>
              <TrendingUpIcon /> github was down
            </CCardText>
            <CCardText>
              <TrendingUpIcon /> error in mongodb
            </CCardText>
            <CCardText>
              <TrendingUpIcon /> microsoft new update
            </CCardText>
            <CCardText>
            <TrendingUpIcon /> Magnifio new ui upadte

              </CCardText>
            <CButton href="#">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader component="h5" >User's analitics</CCardHeader>
          <CCardBody>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>

            <CButton href="#">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader component="h5">Header</CCardHeader>
          <CCardBody>
            <CCardTitle>Special title treatment</CCardTitle>
            <CCardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
            <CButton href="#">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}
