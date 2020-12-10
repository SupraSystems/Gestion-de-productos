declare var $: any;
export class Validacion {
    mensaje = "";
    constructor() { }
    validoText(id, max, min) {
        let form = document.getElementById(id);
        form.addEventListener("blur", function (event) {
            let value = (<HTMLInputElement>document.getElementById(id)).value;
            if (value.length < min || value.length > max) {
                $("#" + id).removeClass("is-valid");
                $("#" + id).addClass("is-invalid");
                $("#" + id + "1").css('display', 'block');
            } else {
                if (value.length >= min && value.length <= max) {
                    $("#" + id).removeClass("is-invalid");
                    $("#" + id).addClass("is-valid");
                    $("#" + id + "1").css('display', 'none');
                }
            }
        }, true);
        let contador = 0;
        $("#" + id).keydown(function (e) {
            let value = (<HTMLInputElement>document.getElementById(id)).value;
            if (e.which == 8) {
                if (contador > 0) {
                    contador -= 1;
                }
                if (contador == 0) {
                    $("#" + id).removeClass("is-valid");
                    $("#" + id).addClass("is-invalid");
                    $("#" + id + "1").css('display', 'block');
                } else {
                    if (contador < min || contador > max) {
                        $("#" + id).removeClass("is-valid");
                        $("#" + id).addClass("is-invalid");
                        $("#" + id + "1").css('display', 'block');
                    } else {
                        if (contador >= min || contador < max) {
                            $("#" + id).removeClass("is-invalid");
                            $("#" + id).addClass("is-valid");
                            $("#" + id + "1").css('display', 'none');
                        }
                    }
                }
            }
            else {
                if (e.which == 32 && contador == 0) {
                    return false;
                }
                else {
                    contador += 1;
                    if ((value.length + 1) >= min && (value.length + 1) < max) {
                        $("#" + id).removeClass("is-invalid");
                        $("#" + id).addClass("is-valid");
                        $("#" + id + "1").css('display', 'none');
                    } else {
                        if (value.length + 1 > max) {
                            $("#" + id).removeClass("is-valid");
                            $("#" + id).addClass("is-invalid");
                            $("#" + id + "1").css('display', 'block');
                        }
                    }
                }
            }
        });
    }

    validoNumber(id, max, min) {
        let form = document.getElementById(id);
        form.addEventListener("blur", function (event) {
            let value = (<HTMLInputElement>document.getElementById(id)).value;
            if (value.length == 0) {
                $("#" + id).removeClass("is-valid");
                $("#" + id).addClass("is-invalid");
                $("#" + id + "1").css('display', 'block');
            } else {
                //
                if (id == "precioDescuentoN") {
                    let mn = parseInt(value)
                    if (mn < 5 || mn > 75) {
                        $("#" + id).removeClass("is-valid");
                        $("#" + id).addClass("is-invalid");
                        $("#" + id + "1").css('display', 'block');
                    }
                    else {
                        if (mn >= min && mn <= max) {
                            $("#" + id).removeClass("is-invalid");
                            $("#" + id).addClass("is-valid");
                            $("#" + id + "1").css('display', 'none');
                        }
                    }
                    //
                } else {
                    if (value.length < min || value.length > max) {
                        $("#" + id).removeClass("is-valid");
                        $("#" + id).addClass("is-invalid");
                        $("#" + id + "1").css('display', 'block');
                    }
                    else {
                        if (value.length >= min && value.length <= max) {
                            $("#" + id).addClass("is-valid");
                            $("#" + id + "1").css('display', 'none');
                        }
                    }
                }
            }
        }, true);
        let contador = 0;
        let num = 0;
        $("#" + id).keydown(function (e) {
            let value = (<HTMLInputElement>document.getElementById(id)).value;
            console.log(e.which)
            if (e.which == 48 && value.length == 0) {
                return false;
            } else {
                if (e.which != 48 && e.which != 49 && e.which != 50 && e.which != 51 && e.which != 52 && e.which != 53 && e.which != 54 && e.which != 55 && e.which != 56 && e.which != 57 && e.which != 8) {
                    return false;
                } else {
                    let temp = contador;
                    if (e.which == 8) {
                        if (contador > 0) {
                            contador -= 1;
                            //
                            num = parseInt((num / 10).toString());
                            if (id == "precioDescuentoN") {
                                if (num < 5 || num > 75) {
                                    $("#" + id).removeClass("is-valid");
                                    $("#" + id).addClass("is-invalid");
                                    $("#" + id + "1").css('display', 'block');
                                } else {
                                    $("#" + id).removeClass("is-invalid");
                                    $("#" + id).addClass("is-valid");
                                    $("#" + id + "1").css('display', 'none');
                                }

                            }
                            //
                        }
                        if (contador == 0) {
                            $("#" + id).removeClass("is-valid");
                            $("#" + id).addClass("is-invalid");
                            $("#" + id + "1").css('display', 'block');
                        } else {
                            if (id == "precioDescuentoN") {
                                if (num < 5 || num > 75) {
                                    $("#" + id).removeClass("is-valid");
                                    $("#" + id).addClass("is-invalid");
                                    $("#" + id + "1").css('display', 'block');
                                } else {
                                    $("#" + id).removeClass("is-invalid");
                                    $("#" + id).addClass("is-valid");
                                    $("#" + id + "1").css('display', 'none');
                                }
                            } else {
                                if (contador < min) {
                                    $("#" + id).removeClass("is-valid");
                                    $("#" + id).addClass("is-invalid");
                                    $("#" + id + "1").css('display', 'block');
                                }
                                else {
                                    if (contador > min) {
                                        $("#" + id).removeClass("is-invalid");
                                        $("#" + id).addClass("is-valid");
                                        $("#" + id + "1").css('display', 'none');
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (e.which == 32) {//si presiona espacio
                            return false;
                        }
                        else {
                            if (e.which != 32) {
                                contador += 1;
                            }//
                            if (id == "precioDescuentoN") {
                                console.log(e.which);
                                num = (num * 10) + (e.which - 48);
                                if (num < 5 || num > 75) {
                                    $("#" + id).removeClass("is-valid");
                                    $("#" + id).addClass("is-invalid");
                                    $("#" + id + "1").css('display', 'block');
                                }
                                else {
                                    if (num >= 5 && num <= 75) {
                                        $("#" + id).removeClass("is-invalid");
                                        $("#" + id).addClass("is-valid");
                                        $("#" + id + "1").css('display', 'none');
                                    }
                                }
                            } else {
                                if ((value.length + 1) >= min && (value.length + 1) < max) {
                                    $("#" + id).removeClass("is-invalid");
                                    $("#" + id).addClass("is-valid");
                                    $("#" + id + "1").css('display', 'none');
                                } else {
                                    if ((value.length + 1) < min || (value.length + 1) > max) {
                                        $("#" + id).removeClass("is-valid");
                                        $("#" + id).addClass("is-invalid");
                                        $("#" + id + "1").css('display', 'block');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    validoFecha(id) {
        let form = document.getElementById(id);
        form.addEventListener("blur", function (event) {
            let value = (<HTMLInputElement>document.getElementById(id)).value;
            if (value.length == 0) {
                $("#" + id).removeClass("is-valid");
                $("#" + id).addClass("is-invalid");
                $("#" + id + "1").css('display', 'block');
            } else {
                $("#" + id).removeClass("is-invalid");
                $("#" + id).addClass("is-valid");
                $("#" + id + "1").css('display', 'none');
            }
        }, true);
    }

    verificacionValidos(id, mensaje) {
        let res = true;
        if (!$("#" + id).hasClass("is-valid")) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "1").css('display', 'block');
            this.addMensaje('debe llenar el campo de ' + mensaje + ' con datos validos <br>')
            res = false;
        }
        return res;
    }
    setMensaje() {
        this.mensaje = "";
    }
    getMensaje() {
        return this.mensaje;
    }
    addMensaje(msj: string) {
        this.mensaje += msj;
    }
    limpiarRegistros(id) {
        $("#" + id).val("").removeClass("is-valid").removeClass("is-invalid");
        $("#" + id + "1").css('display', 'none');
    }
}  