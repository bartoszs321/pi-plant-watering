from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
from routers.login import router as login_router
from routers.users import router as users_router
from routers.water import router as water_router
import uvicorn

app = FastAPI()

app.include_router(login_router)
app.include_router(users_router)
app.include_router(water_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.0.55:3000",
        "http://172.29.4.222:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# testing stuff
@app.get("/camera-feed")
async def proxy_video():
    def iter():
        with httpx.stream("GET", "http://192.168.0.83:8080/shot.jpg") as r:
            for chunk in r.iter_bytes():
                yield chunk

    return StreamingResponse(iter(), media_type="image/jpeg")


# At the end
def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name


use_route_names_as_operation_ids(app)

if __name__ == '__main__':
    uvicorn.run('main:app',
                host='0.0.0.0',
                port=80,
                reload=True)