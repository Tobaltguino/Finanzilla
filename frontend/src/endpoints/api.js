import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/'
const LOGIN_URL = `${BASE_URL}token/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const NOTES_URL = `${BASE_URL}notes/`
const LOGOUT_URL = `${BASE_URL}logout/`
const AUTH_URL = `${BASE_URL}authenticated/`
const SIGNUP_URL = `${BASE_URL}signup/`
const GASTO_URL = `${BASE_URL}gastos/`
const LIMITE_MENSUAL_URL = `${BASE_URL}limite/`
const AGREGAR_GASTO = `${BASE_URL}agregar_gasto/`
const USUARIO_URL = `${BASE_URL}usuario/`;
export const ELIMINAR_GASTO = `${BASE_URL}eliminar_gasto/`; // correcto   
const SET_LIMITE_URL = `${BASE_URL}set_limite/`;
const CATEGORIAS_URL = `${BASE_URL}categorias/`;
const AGREGAR_CATEGORIA = `${BASE_URL}agregar_categoria/`
const ELIMINAR_CATEGORIA = `${BASE_URL}eliminar_categoria/`
const SET_DIVISA_URL = `${BASE_URL}set_divisa/`;



export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL,
        {username:username, password:password},
        {withCredentials: true}
    )
    return response.data.success
}

export const refresh_token = async () => {
    try {
        await axios.post(REFRESH_URL,
            {},
            {withCredentials: true}
        )
        return true
    } catch (error) {
        return false
    }
}

export const get_notes = async () => {
    try{
        const response = await axios.get(NOTES_URL, 
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(NOTES_URL, { withCredentials: true }))
    }

}

export const get_gastos = async () => {
    try{
        const response = await axios.get(GASTO_URL, 
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(GASTO_URL, { withCredentials: true }))
    }

}

export const get_limite = async () => {
    try{
        const response = await axios.get(LIMITE_MENSUAL_URL, 
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(LIMITE_MENSUAL_URL, { withCredentials: true }))
    }

}

const call_refresh = async (error, func) => {
    if (error.response && error.response.status === 401) {
        const tokenRefreshed = await refresh_token();
        if (tokenRefreshed) {
            const retryResponse = await func();
            return retryResponse.data
        }
    }
    return false
}

export const logout = async () => {
    try {
        await axios.post(LOGOUT_URL,
            {},
            {withCredentials: true}
        )
        return true

    } catch (error) {
        return false
    }

}

export const is_authenticated = async () => {
    try {
        await axios.post(AUTH_URL, {}, { withCredentials: true })
        return true
    } catch (error) {
        return false
    }
}

export const register = async (username, email, password) => {
    const response = axios.post(SIGNUP_URL, 
        {username:username, email:email, password:password}, 
        { withCredentials: true }
    )
    return response.data
}


export const agregar_gasto = async (nombre, fecha, monto, categoria,tipo_gasto) => {
    const response = await axios.post(AGREGAR_GASTO, 
        {nombre:nombre, fecha:fecha, monto:monto, categoria:categoria,tipo_gasto:tipo_gasto}, 
        { withCredentials: true }
    )
    return response.data
};


//Falta un try por si no obtiene el usuario
export const get_usuario = async () => {
  const response = await axios.get(USUARIO_URL, { withCredentials: true });
  return response.data;
};

//Guarda el limite mensual 
export const set_limite = async (nuevoLimite) => {
  const response = await axios.post(SET_LIMITE_URL,
    { limite: nuevoLimite },
    { withCredentials: true }
  );
  return response.data;
};

/** ------------------------------------------------------------------------------------------ */
/** Agregar todas las funciones con un try, para evitar el error de reiniciar la página porque el token expiró */
/** ------------------------------------------------------------------------------------------ */

// Falta un try por si hay un error
export const eliminar_gasto = async (id) => {
  const response = await axios.delete(`${ELIMINAR_GASTO}${id}/  `, {
    withCredentials: true,
  });
  return response.data;
};

//Obtiene las categorias
export const get_categorias = async () => {
    try{
        const response = await axios.get(CATEGORIAS_URL, 
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(CATEGORIAS_URL, { withCredentials: true }))
    }

}

export const agregar_categoria = async (nombre, name_icon) => {
    try {
        const response = await axios.post(AGREGAR_CATEGORIA, 
            {nombre:nombre, name_icon:name_icon}, 
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.post(AGREGAR_CATEGORIA, { withCredentials: true }))
    }
};

export const eliminar_categoria = async (id) => {
  const response = await axios.delete(`${ELIMINAR_CATEGORIA}${id}/  `, {
    withCredentials: true,
  });
  return response.data;
};
export const set_divisa = async (nuevaDivisa) => {
  const response = await axios.post(SET_DIVISA_URL,
    { divisa: nuevaDivisa },
    { withCredentials: true }
  );
  return response.data;
};