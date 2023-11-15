import React, { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import io from "socket.io-client";

import { Error404 } from "./pages/404.tsx";
import { Root } from "./pages/root.tsx";
import { DashboardPage } from "./routes/dashboard.tsx";
import { HistoryPage } from "./routes/history.tsx";
import { PluginsPage } from "./routes/plugins.tsx";

import Theme from "./styles/theme.styles.tsx";
import GlobalStyle from "./styles/global.styles.tsx";

export const socket = io("http://localhost:8081");

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error404 />,
        children: [
            {
                path: "",
                element: <DashboardPage />,
            },
            {
                path: "plugins",
                element: <PluginsPage />,
            },
            {
                path: "history",
                element: <HistoryPage />,
            },
        ],
    },
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(
    <Fragment>
        <GlobalStyle />
        <React.StrictMode>
            <ThemeProvider theme={Theme}>
                <App />
            </ThemeProvider>
        </React.StrictMode>
    </Fragment>
);

/*

MAIN (Not affected by react's router.)
PageRoot
-PageRoot
    -Overlay (Currently only shows omeggas version on the top right)
    -EffectLayer (Blurs any peer element under it's z-index, in this case, background layer; can also be disabled.)
    -ReactiveBackground (Occasionally switches images and moves in responce to mouse position)
    -PageHeader (Displays the current page on the left and user account on the right)
        -Title
        -UserDisplay (Currently only greets the user "Welcome, User")
    -PageMain
        -SiteNavigation
        -PageContentArea !! This is where the router changes visuals !!


PLUGINS
PageContentArea
-PageContentArea
    -PluginList 
        -SectionHeader
            -SearchBar
            -Button
                -IconRefresh
        -ScrollContainer
            -PluginItem (Displayed repeatedly based on amount of plugins)
                -PluginStateIcon
                -span (plugin name)
    -PluginInspector (Children of the plugins route is displayed here.)




*/
