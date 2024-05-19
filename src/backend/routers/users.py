from fastapi import APIRouter

from datetime import datetime
from pydantic import BaseModel
from tinydb import TinyDB, Query

from passlib.context import CryptContext
from fastapi import Depends, HTTPException, Form

from .login import get_password_hash
from ..dependencies.dependencies import User, get_current_user, db

router = APIRouter(prefix="/users", tags=["users"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Token(BaseModel):
    access_token: str
    token_type: str
    expiry: datetime


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def update_user_password(username, new_password):
    db.update(
        {"hashed_password": get_password_hash(new_password)},
        Query().username == username,
    )


@router.get("/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.post("/password")
async def update_user(
    new_password: str = Form(),
    current_user: User = Depends(get_current_active_user),
):
    update_user_password(current_user.username, new_password)
    return current_user
