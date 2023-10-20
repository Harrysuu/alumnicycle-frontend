import React, {useEffect} from 'react'
import AnnouncementCard from './components/AnnouncementCard'
import { useHistory } from 'react-router-dom';

export default function HomePage() {
    const history = useHistory ()
    useEffect(() => {
        console.log(history);
        if (!localStorage.getItem('userId')){
            history.push('/login/page')
        }
    }, [history]);
  return (

    <div >
      <AnnouncementCard />
    </div>

  )
}
