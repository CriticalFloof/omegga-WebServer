import React from "react";

/*
PLUGINS
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

// TODO: PUT INTO COMPONENT
function OmeggaInput(props: { placeholder?: string }) {
    return <input placeholder={props.placeholder}></input>;
}

// TODO: PUT INTO COMPONENT
function OmeggaButton(props: { children?: any }) {
    return <button>{props.children}</button>;
}

function PluginsList() {
    return (
        <div>
            <OmeggaInput placeholder="Search Plugins..." />
            <OmeggaButton></OmeggaButton>
        </div>
    );
}

export function PluginsPage() {
    return (
        <div>
            <PluginsList />
        </div>
    );
}
