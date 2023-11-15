import React, { useState } from "react";
import { IPluginSummary } from "../../../web_server_types";
import { socket } from "../application.tsx";

import Button from "../components/interactable/button.tsx";

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
const OmeggaInput = (props: { placeholder?: string }) => {
    return <input placeholder={props.placeholder}></input>;
};

const PluginsList = () => {
    let [isLoaded, updateLoadStatus] = useState<boolean>(false);
    let [plugins, updatePlugins] = useState<React.JSX.Element[]>([]);

    function getPluginList(): Promise<React.JSX.Element[]> {
        return new Promise((resolve) => {
            socket.once("plugins:list", (pluginList: IPluginSummary[]) => {
                console.log(pluginList);

                resolve(
                    pluginList.map((p) => {
                        return (
                            <div key={p.path}>
                                <span>{p.name}</span>
                            </div>
                        );
                    })
                );
            });

            socket.emit("plugins:list");
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
                <Button
                    onClick={async () => {
                        updatePlugins(await getPluginList());
                    }}
                >
                    <p>Refresh</p>
                </Button>
            </div>
            <span>Hello</span>
            <div>{plugins}</div>
        </div>
    );
};

export const PluginsPage = () => {
    return (
        <div>
            <PluginsList />
        </div>
    );
};
