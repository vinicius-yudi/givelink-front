import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

interface JwtPayload {
    exp: number
}

export function notExpiredTokenJwt(savedToken: string): boolean{
    const decoded = jwtDecode<JwtPayload>(savedToken);
    const now = Date.now() / 1000;

    if(decoded.exp && decoded.exp > now){
        return true;
    }
    return false;
}

export function cleanInvalidTokenJwt(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
}

export function validateTokenJwtRedirect(navigate: NavigateFunction){
    useEffect(
        () => {
            const savedToken = localStorage.getItem("access_token");
        
            if(savedToken){
                try{ 
                    if(notExpiredTokenJwt(savedToken)) navigate("/"); 
                }
                catch(error: any){ 
                    cleanInvalidTokenJwt(); 
                }
            }
        },
        []
    );
}