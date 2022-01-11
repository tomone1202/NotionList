<template>
    <div>
        <Modal
            id="edit_form"
            title="詳細資料"
            ref="modal"
            body_min_height="fit-content"
            dialog_width="75vw"
        >
            <template #body>
                <div class="container">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">資訊</th>
                                <th scope="col">值</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>國家中文名</td>
                                <td>
                                    {{
                                        records.translations?.zho?.official ||
                                        ""
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td>國家首都</td>
                                <td>{{ records?.capital[0] || "" }}</td>
                            </tr>
                            <tr>
                                <td>國家車輛行駛方向</td>
                                <td>
                                    {{
                                        records.car.side == "left"
                                            ? "左駕"
                                            : "右駕"
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td>區域</td>
                                <td>{{ records.region }}</td>
                            </tr>
                            <tr>
                                <td>時區</td>
                                <td>{{ records.timezones[0] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template #footer>
                <button class="btn btn-new4" type="button" @click="hide(0)">
                    離開
                </button>
            </template>
        </Modal>
    </div>
</template>
<script>
import Modal from "./modal.vue";
export default {
    name: "detail",
    components: {
        Modal,
    },
    created() {},
    data() {
        return {
            records: { capital: [""], car: { side: "left" } ,region:'',timezones:['']},
            tableData: [
                {
                    date: "2016-05-03",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-02",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-04",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-01",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
            ],
        };
    },
    methods: {
        hide: function () {
            return this.$refs.modal.hide();
        },
        showDetail: async function (record) {
            this.records = await JSON.parse(JSON.stringify(record));
            this.show();
        },
        show: function () {
            return this.$refs.modal.show();
        },
    },
};
</script>
<style lang="scss"></style>
