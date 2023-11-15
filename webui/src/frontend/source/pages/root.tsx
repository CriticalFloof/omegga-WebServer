import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

/*

-PageRoot
    -Overlay (Currently only shows omeggas version on the top right) //candy
    -EffectLayer (Blurs any peer element under it's z-index, in this case, background layer; can also be disabled.) //candy
    -ReactiveBackground (Occasionally switches images and moves in responce to mouse position) //candy
    -PageHeader (Displays the current page on the left and user account on the right)
        -Title
        -UserDisplay (Currently only greets the user "Welcome, User")
    -PageMain
        -SiteNavigation
        -Outlet !! This is where the router changes visuals !!
*/

const PageHeader = () => {
    return (
        <header>
            <span>Page Title</span>
            <UserDisplay />
        </header>
    );
};

const UserDisplay = () => {
    return (
        <div>
            <span>Welcome, Placeholder</span>
        </div>
    );
};

const PageMain = (props: { children: any }) => {
    return <main> {props.children} </main>;
};

const PageNavigation = () => {
    return (
        <div>
            <Link to="/">
                <span>To Dashboard.</span>
            </Link>
            <Link to="/history">
                <span>To History.</span>
            </Link>
            <Link to="/plugins">
                <span>To Plugins.</span>
            </Link>
        </div>
    );
};

export const Root = () => {
    return (
        <div>
            <PageHeader />
            <PageMain>
                <PageNavigation />
                <Outlet />
            </PageMain>
        </div>
    );
};
