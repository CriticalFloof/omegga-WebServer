// TODO: Types.

export declare type IPluginConfigDefinition = {
    description: string;
} & (
    | {
          type: "string" | "password" | "role";
          default: string;
      }
    | {
          type: "boolean";
          default: boolean;
      }
    | {
          type: "number";
          default: number;
      }
    | {
          type: "enum";
          options: (string | number)[];
          default: string | number;
      }
    | {
          type: "players";
          default: {
              id: string;
              name: string;
          };
      }
    | ({
          type: "list";
      } & (
          | {
                itemType: "string";
                default: string[];
            }
          | {
                itemType: "number";
                default: number[];
            }
          | {
                itemType: "enum";
                options: (string | number)[];
                default: string | number;
            }
      ))
);

export interface IPluginCommandArgument {
    name: string;
    description: string;
    required?: boolean;
}

export interface IPluginCommand {
    name: string;
    description: string;
    example?: string;
    args: IPluginCommandArgument[];
}

export interface IPluginDocumentation {
    name: string;
    description: string;
    author: string;
    config: Record<string, IPluginConfigDefinition>;
    commands: IPluginCommand[];
}

export interface IPluginSummary {
    name: string;
    documentation: IPluginDocumentation;
    path: string;
    isLoaded: boolean;
    isEnabled: boolean;
}
