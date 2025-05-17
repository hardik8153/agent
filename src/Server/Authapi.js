// import Config from "../Config";
import axios from "axios";
import Config from "../Config";

export default new (class AuthApi {
  setHeaders(type) {
    // let authToken =
    //     localStorage.getItem("token") &&
    //         localStorage.getItem("token") !== null &&
    //         localStorage.getItem("token") !== false
    //         ? localStorage.getItem("token")
    //         : "";
    axios.defaults.headers[type]["Content-Type"] =
      type === "post" ? "application/json" : "multipart/form-data";
    axios.defaults.headers[type]['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers[type]["Access-Control-Allow-Origin"] = "*";
    // axios.defaults.headers[type]["Authorization"] = `Bearer ${authToken}`;
  }


  async addflows(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.addflows}`;
      this.setHeaders("post");
      let response = await axios.post(url, JSON.stringify(data));
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async flows() {
    try {
      const url = `${Config.apiurl}${Config.apis.flows}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async idflows(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.idflows}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async activateFlow(flowId, data) {
    try {
      const url = `${Config.apiurl}${Config.apis.putflows}/${flowId}/${data}`;
      this.setHeaders("patch");
      let response = await axios.patch(url);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async userupadatestatus(id, status) {
    try {
      const url = `${Config.apiurl}${Config.apis.userupadatestatus}/${id}/status`;
      this.setHeaders("patch");
      let response = await axios.patch(url, status);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async deleteFlow(flowId) {
    try {
      const url = `${Config.apiurl}${Config.apis.deleteflows}/${flowId}`;
      this.setHeaders("delete");
      let response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async postflows(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.postflows}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async login(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.login}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async forgot_password(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.forgot_password}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }


  async messages(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.messages}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async postoptionBlock(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.postoptionBlock}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }


  async posteachOption(optionBlockBackendId, optionPayload) {
    try {
      const url = `${Config.apiurl}${Config.apis.posteachOption}/${optionBlockBackendId}/options`;
      this.setHeaders("post");
      let response = await axios.post(url, optionPayload);
      return response.data;
    } catch (error) {
      return false;
    }
  }


  async responseBlock(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.responseBlock}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async endBlock(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.endBlock}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }



  // trigger

  async trigger(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.trigger}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return false;
    }
  }




  async idtrigger(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.idtrigger}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async idpostoptionBlock(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.idpostoptionBlock}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async optionsid(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.optionsid}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async responseBlockid(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.responseBlockid}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async endBlockid(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.endBlockid}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async roles() {
    try {
      const url = `${Config.apiurl}${Config.apis.roles}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async users() {
    try {
      const url = `${Config.apiurl}${Config.apis.users}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }
  async usersid(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.usersid}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async getManagers() {
    try {
      const url = `${Config.apiurl}${Config.apis.getManagers}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async managePermission1() {
    try {
      const url = `${Config.apiurl}${Config.apis.managePermission1}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async managePermissionupdate(id, data) {
    try {
      const url = `${Config.apiurl}${Config.apis.managePermissionupdate}/${id}/permissions`;
      this.setHeaders("put");
      let response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in trigger:", error);
      return false;
    }
  }


  async managePermissionid(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.managePermissionid}/${id}/permissions`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async customerbyid(id) {
    try {
      const url = `${Config.apiurl}${Config.apis.customerbyid}/${id}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async customer() {
    try {
      const url = `${Config.apiurl}${Config.apis.customer}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async ticket() {
    try {
      const url = `${Config.apiurl}${Config.apis.ticket}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async conversationalFilters() {
    try {
      const url = `${Config.apiurl}${Config.apis.conversationalFilters}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async ticketsfiltar({ statusFilter, sortOptions }) {
    try {
      const url = `${Config.apiurl}${Config.apis.ticketsfiltar}?statusFilter=${statusFilter}&sortOptions=${sortOptions}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }


  async customerDetails(ticketId ) {
    try {
      const url = `${Config.apiurl}${Config.apis.customerDetails}?ticketId=${ticketId}&agentId=07866843-681b-417e-a9f6-7f5364f80276`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }

  async sortOptions() {
    try {
      const url = `${Config.apiurl}${Config.apis.sortOptions}`;
      this.setHeaders("get");
      let data = await axios
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return false;
        });
      return data;
    } catch (error) {
      return false;
    }
  }








  async postusers(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.postusers}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in usercout:", error);
      return false;
    }
  }

  async checkin(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.checkin}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in usercout:", error);
      return false;
    }
  }

  async checkout(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.checkout}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in usercout:", error);
      return false;
    }
  }

  async reset_password(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.reset_password}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in usercout:", error);
      return false;
    }
  }

  async assignusers(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.assignusers}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in usercout:", error);
      return false;
    }
  }

  async addroles(data) {
    try {
      const url = `${Config.apiurl}${Config.apis.addroles}`;
      this.setHeaders("post");
      let response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // console.error("Error in usercout:", error);
      return false;
    }
  }


  async deleteroles(flowId) {
    try {
      const url = `${Config.apiurl}${Config.apis.deleteroles}/${flowId}`;
      this.setHeaders("delete");
      let response = await axios.delete(url);
      return response.data;
    } catch (error) {
      // console.error("Error in deleteFlow:", error);
      return false;
    }
  }


})();
