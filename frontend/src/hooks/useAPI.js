import axios from 'axios';

function useAPI() {
    const GET = async (url, params = {}) => {
        try {
            const res = await axios.get(url, { params });
            return res;
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    const POST = async (url, data = {}, params = {}) => {
        try {
            const res = await axios.post(url, data, { params });
            return res;
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    const PUT = async (url, data = {}, params = {}) => {
        try {
            const res = await axios.put(url, data, { params });
            return res;
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    const DELETE = async (url, params = {}) => {
        try {
            const res = await axios.delete(url, { params });
            return res;
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    return { GET, POST, PUT, DELETE };
}

export default useAPI;
