import { describe, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCreateWidget } from './useCreateWidget'

describe('useCreateWidget', () => {
    test('should create a widget', () => {
        renderHook(useCreateWidget);
    })
})