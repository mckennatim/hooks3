#hooks3/cascada2

## log
### 9/18/20 version_update
updated deployed version to hooks3
### 9/15/20 weeklyScheduler
when you hit `change today` tap changes but WeeklyScheduler re-renders before the page changes back to `control`. `nav2` does not navigate ahead on setProps 

fix: add typ to prups

      const setNewSched=()=>{
        console.log('query: ', query)
        nav2("Control", {...prups, typ:query, sched:edsched, doupd:true}, query)
      }

### 8/27/20 1-do_other_shit

Fixed things so that only when state exists and `changePro` is called with the state's current schedule `state[prups.typ].pro` different from the stringified `prups.sched` will the new schedule be published.

`changePro` is called from `doOtherShit` which runs only if you are connected, every time `useDevSpecs` is called (I think only on loading control??? ) and on `monitorFocus` which is called by `refocus`. which runs whenever you click on the app. 