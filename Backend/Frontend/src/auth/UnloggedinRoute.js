import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import UnloggedinLayout from "layouts/UnloggedinLayout";

const UnloggedinRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <UnloggedinLayout component={Component}/>
        }
    />
)
export default UnloggedinRoute;