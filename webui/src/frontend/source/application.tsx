import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Error404 } from "./pages/404.tsx";
import { Root } from "./routes/root.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error404 />,
    },
]);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
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
