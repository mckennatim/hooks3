import React from 'react'
// import {ZoneTimer, themodule} from '../../npm/react-zonetimer'
import{ZoneTimer, themodule}from '@mckennatim/react-zonetimer'
import {nav2 } from '../app'

const DailyScheduler=(props)=>{
  const {prups}=props.cambio.page
  const {locdata, from,typ,durs, range} = prups
  const dur = durs ? durs[typ] : 20
  const {asched} = prups
  const query = props.cambio.page.params.query
  const {sunrise,sunset} = locdata
  const dif=2
  const tm = themodule(range)
  const now =tm.getNow(locdata.tzadj)
  // const asched = [[0,0,59,53],[7,45,79,71],[10,50,56,52],[17,45,66,64],[20,50,56,52],[22,50,67,61]]
  // const ret2page = props.cambio.page.prups.from

  const setNewSched=(sched)=>()=>{
    console.log('sched: ', sched)
    nav2(from, {...prups, locdata, sched, doupd:true}, query)
  }

  const parseToday =()=>{
    if(asched && from =="Control"){
      console.log('fromControl')
      console.log('asched: ', asched)
      const hm = now.split(':')
      const shsched = asched.reduce((acc,s)=>{
        console.log('acc.slice(-1),s[2]: ', acc.slice(-1)[0][2],s[2])  
        if (s[0]>hm[0]*1 && acc.slice(-1)[0][2]!=s[2]){
          acc.push(s)
        }
        return acc
      },[[0,0,0]])
      return shsched
    }
  }

  const fsched =parseToday()
  console.log('fsched: ', fsched)

  return(
    <div style={styles.div}>
      <ZoneTimer 
        range={range}
        dif={dif}
        difrange={12}
        templines={[]}
        sunrise={sunrise} 
        sunset={sunset}
        now={now}
        asched={fsched}
        retNewSched={setNewSched}   
        dur={dur}
      />
    </div>
  )
}

export{DailyScheduler}

const styles = {
  div:{
    overscrollBehaviorY: "none",
    overscrollBehaviorX: "none",
    position: "fixed",
    overflow: "hidden"
  }
}