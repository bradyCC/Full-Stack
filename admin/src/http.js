/**
 * Created by brady on 2019/6/15.
 */
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api/'
})

export default http
