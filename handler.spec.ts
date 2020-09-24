// set up global namespace for worker environment
import { default as makeServiceWorkerEnv } from "service-worker-mock"
declare let global: any
Object.assign(global, makeServiceWorkerEnv())

import { handleRequest } from "./handler"

describe("handler returns response with request method", () => {
	const methods = ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"]
	methods.forEach(method => {
		it(method, async () => {
			const result = await handleRequest(new Request("/", { method }))
			const text = await result.text()
			expect(text).toContain(method)
		})
	})
})
