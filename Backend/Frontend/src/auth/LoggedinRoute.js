import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isAuthenticated} from './index';

import LoggedinLayout from "layouts/LoggedinLayout";

const LoggedinRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render ={ props =>
            isAuthenticated() && (isAuthenticated().user.validated===true)? (
                <LoggedinLayout component={Component}/>
            ) : (
                <Redirect to = {{
                    pathname:"/signin",
                    state: {from: props.location}
    
                }}
                />
            )
        }
    />
)
export default LoggedinRoute;