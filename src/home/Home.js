import { Route, Switch } from 'react-router'
import Navbar from '../navbar/Navbar'
import Upload from '../upload/Upload'
import Wall from '../wall/Wall'
import Preview from '../preview/Preview'
const Home = () => {
    return (
        <>
            <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Wall />
                    </Route>
                    <Route path="/upload" component={Upload} />
                    <Route path='/preview/:id' component={Preview} />
                </Switch>
        </>
    )
}

export default Home;