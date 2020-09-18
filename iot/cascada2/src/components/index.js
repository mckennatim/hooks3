import{App} from './App'
import{Splash}from './Splash.jsx'
import{Control}from './Control.jsx'
import{Config}from './Config.jsx'
// import{Zone} from './Zone.jsx'
import{BigData} from './BigData.jsx'
import{DailyScheduler} from './DailyScheduler.jsx'
import{WeeklyScheduler} from './WeeklyScheduler.jsx'

const multi =[]
// const multi =[
//   {pri:'Zone', mul:[
//     ['Zone', 'DailyScheduler'],
//     ['Zone', 'DailyScheduler', 'Config'],
//     ['Zone', 'DailyScheduler', 'Config'],
//   ]},
//   {pri:'DailyScheduler', mul:[
//     ['Zone', 'DailyScheduler'],
//     ['Zone', 'DailyScheduler', 'Config'],
//     ['Zone', 'DailyScheduler', 'Config'],
//   ]}

// ]

const panes= [1,1,2,2,3,3,4]

export{App, Splash, Control, Config, DailyScheduler, WeeklyScheduler, BigData, panes, multi}