const baseUrl = "https://localhost:44316/api/Cooler"

Vue.createApp({
    data() {
        return {
            coolers: [],
            
            singleCooler: null,
            idToGetBy: -1,
            
            deleteId: 0,
            deleteMessage: "",
            addData: { capacityOfBottles: null, temp: null, bottlesInStorage: null },
            addMessage: "",
        }
    },
    created(){
        this.getAllCoolers()
    },

    methods: {
        

        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.coolers = await response.data
            } catch (ex) {
                alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
            }
        },
        
        getAllCoolers() {
            this.helperGetAndShow(baseUrl)
        },

        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleCooler = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },

        async AddWine(id) {
            const url = baseUrl + "/" + id + "/AddWine"
            try {
                const response = await axios.get(url)
                this.addMessage = "response " + response.status + " " + response.statusText
            } catch (ex) {
                alert(ex.message)
            }
            this.getAllCoolers()
        },

        async deleteCooler(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllCoolers()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async add() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllCoolers()
            } catch (ex) {
                alert(ex.message)
            }
        },



    }
}).mount("#app")