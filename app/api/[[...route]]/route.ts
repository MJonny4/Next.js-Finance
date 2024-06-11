import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import accounts from './accounts'
import { HTTPException } from 'hono/http-exception'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

// err = Error, ctx = Context
app.onError((err, ctx) => {
    if (err instanceof HTTPException) {
        return err.getResponse()
    }

    return ctx.json(
        {
            error: 'Internal Server Error',
        },
        500,
    )
})

const routes = app.route('accounts', accounts)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes
