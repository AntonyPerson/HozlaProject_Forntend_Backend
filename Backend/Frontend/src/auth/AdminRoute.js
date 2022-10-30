import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isAuthenticated} from './index';

import LoggedinLayout from "layouts/LoggedinLayout";

const AdminRoute = ({component: Component, ...rest}) => (
    <Route
    {...rest}
    render ={ props =>
        isAuthenticated() && (isAuthenticated().user.validated===true) && isAuthenticated().user.role === "0" ? (
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
export default AdminRoute;