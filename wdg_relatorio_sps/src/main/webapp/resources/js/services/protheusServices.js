const protheusServices = {

    async getCentroCusto(){
        const response = await fetch(`${MyWidget.urlServicos}ccusto?cosnulta=todos`, {
            method: "GET",
            headers: {
                "Authorization": MyWidget.Authorization
            }
        });
        return await response.json();
    }

}