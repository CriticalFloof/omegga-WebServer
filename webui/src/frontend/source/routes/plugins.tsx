import React, { useState } from "react";
import { socket } from "../application.tsx";
import { IPluginSummary } from "../../../web_server_types";

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

// TODO: PUT INTO COMPONENT FILE
function OmeggaInput(props: { placeholder?: string }) {
    return <input placeholder={props.placeholder}></input>;
}

// TODO: PUT INTO COMPONENT FILE
function OmeggaButton({ children = null, ...attributes }) {
    return <button {...attributes}>{children}</button>;
}

function PluginsList() {
    let [isLoaded, updateLoadStatus] = useState<boolean>(false);
    let [plugins, updatePlugins] = useState<React.JSX.Element[]>([]);

    function getPluginList(): Promise<React.JSX.Element[]> {
        return new Promise((resolve) => {
            socket.once("pluginslist:get", (pluginList: IPluginSummary[]) => {
                console.log(pluginList);

                resolve(
                    pluginList.map((p) => {
                        return (
                            <div>
                                <span>{p.name}</span>
                            </div>
                        );
                    })
                );
            });

            socket.emit("pluginslist:get");
        });
    }

    // This is to avoid an infinite loop.
    if (!isLoaded) {
        getPluginList().then((pluginList) => updatePlugins(pluginList));

        updateLoadStatus(true);
    }

    return (
        <div>
            <div>
                <OmeggaInput placeholder="Search Plugins..." />
                <OmeggaButton
                    onClick={async () => {
                        updatePlugins(await getPluginList());
                    }}
                ></OmeggaButton>
            </div>
            <div>{plugins}</div>
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
