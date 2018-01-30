// Copyright (C) 2017 Nokia

import {CommonFields, ExecutionState, ItemDuration} from "./common";
import {stringToObject} from "../utils";

export interface RuntimeContext {
    triggered_by?: {
        event: string; task_id: string;
    }[];
}

export interface JTaskExec extends CommonFields {
    name: string;
    runtime_context: string | object;
    workflow_name: string;
    state_info: string;
    state: ExecutionState;
    workflow_execution_id: string;
    workflow_id: string;
    processed: boolean;
    published: string | object;
    type: "ACTION" | "WORKFLOW";
    result: null | object;
}

export class TaskExec implements JTaskExec {
    name: string;
    runtime_context: string | RuntimeContext;
    workflow_name: string;
    state: ExecutionState;
    workflow_execution_id: string;
    workflow_id: string;
    processed: boolean;
    published: string | Object;
    type: "ACTION" | "WORKFLOW";
    id: string;
    created_at: string;
    updated_at: string;
    state_info: string;
    result: null | object;

    taskDuration: ItemDuration;

    constructor(other: JTaskExec) {
        Object.assign(this, other);
        this.runtime_context = stringToObject(this.runtime_context, "json");
    }

    setResult(result: string) {
        this.result = stringToObject(result, "json");
    }

    setPublished(result: string) {
        this.published = stringToObject(result, "json");
    }

    get isAction() {
        return this.type === "ACTION";
    }

    get isWorkflow() {
        return this.type === "WORKFLOW";
    }

    get duration() {
        if (!this.taskDuration) {
            this.taskDuration = new ItemDuration(this.created_at, this.updated_at);
        }
        return this.taskDuration.duration;
    }
}
