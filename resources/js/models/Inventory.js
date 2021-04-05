import axios from 'axios';

export default class Inventory {
    /**
     * Fetch a paginated inventory list.
     *
     * @param {object} params
     *
     * @return {object}
     */
    static async paginated(params = {}) {
        const response = await axios.get('/api/v1/inventories', {
            params,
        });

        if (response.status !== 200) {
            return {};
        }

        return response.data;
    }

    /**
     * Store a new inventory.
     *
     * @param {object} attributes
     *
     * @return {object}
     */
    static async store(attributes) {
        console.log(attributes);
        const response = await axios.post('/api/v1/inventories', attributes);
        
        if (response.status !== 201) {
            return {};
        }

        return response.data;
    }

    /**
     * Show a inventory.
     *
     * @param {number} id
     *
     * @return {object}
     */
    static async show(id) {
        const response = await axios.get(`/api/v1/inventories/${id}`);

        if (response.status !== 200) {
            return {};
        }

        return response.data;
    }

    /**
     * Update a inventory.
     *
     * @param {number} id
     * @param {object} attributes
     *
     * @return {object}
     */
    static async update(id, attributes) {
        const response = await axios.patch(`/api/v1/inventories/${id}`, attributes);

        if (response.status !== 200) {
            return {};
        }

        return response.data;
    }

    /**
     * Delete a inventory.
     *
     * @param {number} id
     *
     * @return {object}
     */
    static async delete(id) {
        const response = await axios.delete(`/api/v1/inventories/${id}`);

        if (response.status !== 200) {
            return {};
        }

        return response.data;
    }

    /**
     * Restore a inventory.
     *
     * @param {number} id
     *
     * @return {object}
     */
    static async restore(id) {
        const response = await axios.patch(`/api/v1/inventories/${id}/restore`);

        if (response.status !== 200) {
            return {};
        }

        return response.data;
    }
}
