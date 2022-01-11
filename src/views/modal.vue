<template>
    <div class="modal fade" ref="modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog modal-lg" :style="get_dialog_style()">
            <div class="modal-content watermark-container">
                <div class="modal-header">
                    <slot name="header">
                        <span class="modal-title">
                            {{ title }}
                        </span>
                    </slot>
                </div>

                <div ref="modal_body" class="modal-body" :style="get_modal_body_style()">
                    <!-- 勿刪 -->
                    <input style="display:none">
                    <input type="password" style="display:none">
                    <!-- 勿刪 -->
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button class="btn btn-danger" @click="hide()">
                            離開
                        </button>
                    </slot>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "modal",
    components: { 
    },
    data: function () {
        return {
            p_resolve: null,
        };
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        title: {
            type: String,
            default: "未獲取Tittle",
        },
        dialogStyle: Object,
        modalBodyStyle: Object,
        body_min_height: {
            type: String,
            default: "680px",
        },
        dialog_width: {
            type: String,
            default: "1600px",
        },
    },
    created: function () {},
    computed: {},
    methods: {
        
        get_dialog_style: function () {
            return Object.assign({
                "max-width": this.dialog_width,
            }, this.dialogStyle
            );
        },
        get_modal_body_style: function () {
            return Object.assign({ 
                "min-height": this.body_min_height, 
                "max-height": "680px"
            }, this.modalBodyStyle);
        },
        show: function () {
            var modal = $(this.$refs.modal);
            modal.modal("show");
            $(this.$refs.modal_body).scrollTop(0);

            return new Promise((resolve) => (this.p_resolve = resolve));
        },
        hide: function (value) {
            $(this.$refs.modal).modal("hide");
            this.p_resolve(value);
        },
    },
};
</script>
<style lang="scss">
.modal {
    display: none;
    overflow-y: auto;
    .modal-title{
        font-size: 2em;
    }
    .modal-dialog {
        .modal-content {
            display: flex; 
            flex-direction: column;
            position: relative;
            background-color: #fff;
            width: 100%;
            border-radius: 10px;
            border: none;
            overflow: hidden;
            -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.4);
            box-shadow: 0 3px 9px rgba(0, 0, 0, 0.4);
            .modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 4.5rem;
                padding: 0 1.5rem;
                border-radius: 10px 10px 0 0;
                background: #22354d;
                span {
                    font-size: 1.5rem;
                    color: #fff;
                }
            }
            .modal-body {
                position: relative;
                padding: 15px;
                .control-label {
                    width: 100%;
                    margin: 0.5rem 0;
                    font-size: 1.8rem;
                    text-align: left;
                }
            }

            .modal-footer {
                border: none;
                padding: 1.5rem;
                
                button {
                    color:whitesmoke;
                    
                    background-color: brown;
                }
            }
        }
    }
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
}

.modal-backdrop.fade {
    opacity: 0;
    filter: alpha(opacity=0);
}

.modal-backdrop.in {
    opacity: 0.5;
    filter: alpha(opacity=50);
}

.modal-scrollbar-measure {
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll;
}
</style>
