<template>
    <div class="bg-danger">
        <div class="container py-3">
            <div class="d-flex justify-content-around">
                <el-form :inline="true" :model="formInline">
                    <el-form-item>
                        <el-input
                            v-model="keyword"
                            placeholder="請輸入國家名稱"
                            @keyup.enter="onSubmit"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit"
                            >搜尋</el-button
                        >
                    </el-form-item>
                </el-form>

                <el-pagination
                    :page-size="25"
                    background
                    layout="prev, pager, next"
                    :total="totalData"
                    v-model:currentPage="currentPage"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>

            <table class="table table-hover table-dark rounded">
                <thead>
                    <tr>
                        <th
                            v-for="field in fields"
                            :key="field.key"
                            class="text-center"
                            :class="`field-scale-${field.scale}`"
                        >
                            <span @click="order" role="button" style="curso" v-if="field.key == 'name'">
                                {{ field.label }}
                                <span >{{
                                    isAsc == "asc" ? "▼" : "▲"
                                }}</span>
                            </span>
                            <span v-else>
                                {{ field.label }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, index) in selectPageList" :key="index">
                        <td
                            v-for="field in fields"
                            :key="field.key"
                            class="text-left"
                            style="word-wrap: break-word; max-width: 100px"
                            :class="`field-scale-${field.scale}`"
                        >
                            <span v-if="field.key == 'flags'">
                                <img
                                    :src="record.flags.png"
                                    class="img-fluid"
                                    alt=""
                                />
                            </span>
                            <span v-else-if="field.key == 'name'">
                                <button
                                    @click="getDetail(record)"
                                    class="btn btn-success"
                                >
                                    {{ record.name.official }}
                                </button>
                            </span>
                            <span
                                v-else-if="field.key == 'nativeName'"
                                :style="{
                                    'font-size':
                                        record.name.nativeName?.zho?.official &&
                                        '24px',
                                    'font-weight':
                                        record.name.nativeName?.zho?.official &&
                                        'bold',
                                }"
                            >
                                {{
                                    record.name.nativeName?.zho?.official ||
                                    "無中文母語名稱"
                                }}
                            </span>
                            <span v-else-if="field.key == 'altSpellings'">
                                {{ record.altSpellings[0] }}
                            </span>
                            <span
                                style="word-wrap: break-word; max-width: 100px"
                                v-else-if="field.key == 'idd'"
                            >
                                {{ returnIdd(record.idd) }}
                            </span>
                            <span v-else>
                                {{ record[field.key] }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Detail ref="detail"></Detail>
    </div>
</template>

<script>
// @ is an alias to /src
import { ElLoading } from "element-plus";
import Detail from "./detail.vue";
const API = {
    getList: "https://restcountries.com/v3.1/all",
    search: "https://restcountries.com/v3.1",
};
import getColumn from "./column";
export default {
    name: "Home",
    components: { Detail },
    data() {
        return {
            fields: [],
            lists: [],
            formInline: { user: "", region: "" },
            keyword: "",
            isAsc: false,
            totalData: 0,
            pageList: [],
            selectPageList: [],
            currentPage: null,
        };
    },
    created() {
        this.getList();
        this.fields = getColumn();
    },
    methods: {
        handleCurrentChange(p1) {
            this.selectPageList = this.pageList[p1 - 1];
        },
        order: function () {
            const loading = ElLoading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            if (this.isAsc == "asc") {
                this.isAsc = "desc";
            } else {
                this.isAsc = "asc";
            }
            let tempList = [];
            tempList = _.orderBy(this.lists, "name['official']", [this.isAsc]);
            this.lists = tempList;
            this.pagination();
            this.selectPageList = this.pageList[0];
            this.currentPage = null;
            this.currentPage = 1;
            loading.close();
        },
        getList: async function () {
            const loading = ElLoading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            await axios
                .get(API.getList, "")
                .then(async (res) => {
                    this.totalData = res.data.length;
                    this.lists = _.orderBy(res.data, "name['official']", [
                        "asc",
                    ]);
                    this.isAsc = "asc";
                    this.pagination();
                    this.selectPageList = this.pageList[0];
                    loading.close();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        pagination: function () {
            const loading = ElLoading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            let pageList = [[]];
            let page = 0;
            this.lists.forEach((params) => {
                if (pageList[page].length < 24) {
                    pageList[page].push(params);
                } else {
                    pageList[page].push(params);
                    page += 1;
                    pageList[page] = [];
                }
            });
            this.pageList = pageList;
            loading.close();
        },
        returnIdd(idd) {
            let returnStr = "";
            if (idd.root) {
                if (idd.suffixes.length > 1) {
                    idd.suffixes.forEach((element) => {
                        returnStr += `${idd.root + element},`;
                    });
                    return returnStr;
                } else if (idd.suffixes.length == 1) {
                    return `${idd.root + idd.suffixes[0]}`;
                }
            }
        },
        onSubmit: async function () {
            const loading = ElLoading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            if (this.keyword) {
                await axios
                    .get(`${API.search}/name/${this.keyword}`, "")
                    .then(async (res) => {
                        this.totalData = res.data.length;
                        this.selectPageList=[]
                        this.lists = _.orderBy(res.data, "name['official']", [
                            "asc",
                        ]);
                        await this.pagination();
                        this.selectPageList = this.pageList[0];
                        this.currentPage = null;
                        this.currentPage = 1;
                        loading.close();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                this.getList();
            }
        },
        async getDetail(record) {
            let awaitRecord = await record;
            this.$refs.detail.showDetail(awaitRecord);
        },
    },
};
</script>
<style lang="scss">
.field-scale {
    --scale: 1;
    min-width: calc(100px * var(--scale));
    max-width: calc(100px * var(--scale));
}

.field-scale-1 {
    @extend .field-scale;
    --scale: 1;
}

.field-scale-2 {
    @extend .field-scale;
    --scale: 2;
}

.field-scale-3 {
    @extend .field-scale;
    --scale: 3;
}
</style>
