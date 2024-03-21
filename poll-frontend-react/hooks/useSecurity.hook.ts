import axios, { AxiosResponse } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export interface ConnectedUser {
    accessToken: string;
    refreshToken: string;
    id: number;
    name: string;
  }

  interface JwtResponse {
    accessToken: string;
    refreshToken: string;
  }

  interface JwtCustomPayload extends JwtPayload {
    username: string
  }

export interface SecurityData {
    connectedUser: ConnectedUser | undefined,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void,
    refresh: () => Promise<string>,
  }



export default function useSecurity() : SecurityData {
    const [connectedUser, setConnectedUser] = useState<ConnectedUser | undefined>(undefined);

    useEffect(() => {
        const json = localStorage.getItem('user');
        if (json)
            setConnectedUser(JSON.parse(json));
    }, [])

    function onAuthenticationResponse(res: AxiosResponse<JwtResponse>) {
        const decodedAccessToken = jwtDecode<JwtCustomPayload>(res.data.accessToken);
        const user = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            id: Number(decodedAccessToken.sub),
            name: decodedAccessToken.username
        };
        setConnectedUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const login = async (email: string, password: string) => {
        return axios.post<JwtResponse>(process.env.NEXT_PUBLIC_BACK_URL + "authenticate", {
            username: email,
            password: password,
            grantType: 'password'
          })
          .then(onAuthenticationResponse);
    }

    const refresh = async () => {
        return axios.post<JwtResponse>(process.env.NEXT_PUBLIC_BACK_URL + "authenticate", {
            refreshToken: connectedUser?.refreshToken,
            grantType: 'refreshToken'
        })
        .then(res => {
            onAuthenticationResponse(res);
            console.log("refresh: " + res.data.accessToken);
            return res.data.accessToken;
        });
    }
    
    const logout = () => {
        setConnectedUser(undefined);
        localStorage.removeItem('user');
    }
    
    return { connectedUser: connectedUser, login: login, logout: logout, refresh: refresh };
}