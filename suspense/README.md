# next generation react app

A rewrite for front end might include
* suspense
* router 6
* error boundaries

### suspense
The coolest thing about suspense is the new `render as you fetch` pattern. the other  attractive feature are guidance on creating wrappers for fetch (and maybe rxjs websockets and mqtt)
* https://reactjs.org/docs/concurrent-mode-suspense.html
* https://blog.logrocket.com/react-suspense-for-data-fetching/

### error boundaries 
* https://www.w3schools.com/tags/tag_details.asp
* https://reactjs.org/docs/error-boundaries.html ex:https://codepen.io/gaearon/pen/wqvxGa?editors=0110

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### router 6
The main problem with navigo has to do with forwarding props to a new page component. What is attractive about router 6 is `useNavigate('../success', { replace: true, state: {dog:'Ulysses'} });` with an optional second { replace, state } parameter object, particularly that you can send it some state without having to put it in some context or global store. `<Navigate to="/dashboard" replace={true} state={dog:'Ulysses'}/>`

### how it works now
Characteristics of the new app would include a `<ClientSocket cfg={cfg}>` surroundinf `<App>`. A `Control` component would create a client object that would allow it to respond to messages
```jsx
const [client, publish] = useContext(Context);
client.onMessageArrived= onMessageArrived
```
Then another custom hook would kick off 

```jsx
const {devs, zones, binfo, error}= useDevSpecs(ls, cfg, client, (devs,zones)=>{
  if(!client.isConnected()){
    connect(client,lsh,(client)=>{
      if (client.isConnected()){
        setupSocket(client, devs, publish, topics, (devs, client)=>doOtherShit(devs, zones, client))
      }
    })
  }else{
    setupSocket(client, devs, publish, topics, (devs, client)=>doOtherShit(devs, zones, client))
  }
})
```
Once connected `onMessageArrived` will `mqtt-hooks/processMessage` and `dispatch` it via a reducer to change state. 
```jsx
  const initialState = {
    temp_out: {darr:[0,0,0,0]},
    lux: {darr:[0]},
    pond: {pro:[[0,0,0],[19,15,1]], timeleft:0, darr:[0,0,0]},
    hi_bed: {pro:[[0,0,0],[19,15,1]], timeleft:0, darr:[0,0,0]},
    lo_bed: {pro:[[0,0,0],[19,15,1]], timeleft:0, darr:[0,0,0]}
  }
  function onMessageArrived(message){
    const nsarr = processMessage(message, devs, state)
    if(nsarr.length>0){
      nsarr.map((ns)=>{
        const key =Object.keys(ns)[0]
        const action = {type:key, payload:ns[key]}
        dispatch(action)
      })
    }
  }
 ```
 The interesting thing here is that `processMessage` takes a `state` parameter that is initaly defined in as `initialState` which sends a message to `mqtt-hooks` telling it what devices and properties that the react app cares about.

`Control` has now done it's job and can pass `state`, `devs`, `zones`, `locdata` to other components `Zones`

### howto start
* set up a new npm project with all the latest npm's required
* Set up a minimal app with `Control` working and `Zones` just dumping data
then
* add `changeTo` support to allow `req, cmd and pro` so publishing can happen
* send `changeTo` commands from `Zones` to `Control`
