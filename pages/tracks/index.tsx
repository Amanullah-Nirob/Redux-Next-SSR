import React from 'react';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../components/MainLayout';
import HomeContent from '../../components/HomeContent';
import Player from '../../components/Player';
import { wrapper, AppStore } from '../../redux/store';
import { fetchTracks } from '../../redux/thunks/tracks';
import { GetServerSideProps } from 'next';

const index = () => {
  return (
    <MainLayout title="Tracks">
      <HomeContent />
    </MainLayout>
  );
};

export default index;



export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) => async (context) => {
    try {
      const dispatch = store.dispatch;
      await dispatch(fetchTracks(1)) 
      return { props: {} }

    } catch (err) {
      console.log(err);
      return { props: {} }
    }
  }
)