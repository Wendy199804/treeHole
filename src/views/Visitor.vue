<template>
  <div class="visitor">
    <!-- <div v-for="(item, index) in col" :key="index" @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)" class="fath" style="width: 180px;border:1px solid black;">
      <p :ref="item.ref" :class="item.classname ? 'aaa' : ''" style="width: 180px;">{{ item.text }}</p>
      <div v-if="item.mousein">{{ item.text }}</div>
    </div> -->
    <!-- @cell-mouse-enter="handleMouseEnter" :cell-class-name="cellclassname" -->
    <el-table :data="col" style="width: 100%"  :row-style="{height:'30px'}">
      <el-table-column prop="text" label="??" width="180">
        <template slot-scope="scope" >
          <el-tooltip class="position" v-if="scope.row.text.length>=23" effect="dark" :content="scope.row.text" placement="top">
            <div class="hoveTitle">{{ scope.row.text }}</div>
          </el-tooltip>
          <div class="hoveTitle" v-if="scope.row.text.length<23">{{ scope.row.text }}</div>
        </template>
        
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      mousein: false,
      col: [
        {
          id: '11',
          mousein: false,
          classname: false,
          ref: 'item1',
          text: 'safafafaf我我我我我我我我我dfaf我我我我我我我我我fhfjfshksjh我我我我',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '12',
          mousein: false,
          classname: false,
          ref: 'item2',
          text: 'www武警部队几百块的寄生虫的时间才能开始对接',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '13',
          mousein: false,
          classname: false,
          ref: 'item3',
          text: '123',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '14',
          mousein: false,
          classname: false,
          ref: 'item3',
          text: '123333333333333333333333333333333',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '15',
          mousein: false,
          classname: false,
          ref: 'item3',
          text: '上海市普陀区金沙江路上海市普陀区金沙的的的的的',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    mouseOver(index) {
      console.log(index)
      if (this.col[index].classname) {
        this.col[index].mousein = true
      }
    },
    mouseLeave(index) {
      if (this.col[index].classname) {
        this.col[index].mousein = false
      }
    },
    addClassname(col, index) {
      if (this.$refs[col[index].ref].offsetHeight > 42) {
        this.col[index].classname = true
      }
    },
    handleMouseEnter(row, column, cell, event) {
      // row.mousein =true
      // console.log(row, column, cell, event)
      if (cell.offsetHeight > 70) {
        row.classname = true
      }
    },
    cellclassname(obj) {
      console.log(obj.row.offsetHeight)
      if (obj.columnIndex == 0) {
        if (obj.row.classname) {
          return 'aaa'
        }
      }
      return ''
    },
   
  },
  mounted() {
    // let that = this
    // for (let i = 0; i < that.col.length; i++) {
    //   if (that.$refs[that.col[i].ref][0].offsetHeight > 42) {
    //     that.col[i].classname = true
    //   }
    // }
    // this.handleMouseEnter()
    console.log(this.$refs.text)
  }
}
</script>

<style lang="scss">
.visitor {
  .el-table .aaa {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .fath {
    position: relative;
    cursor: pointer;
    div {
      width: 300px;
      position: absolute;
      left: 190px;
      top: 0px;
      background: #999999;
      color: white;
      border-radius: 5px;
    }
  }
  .hoveTitle {
    // 　text-align: left;
    // 　　width: 140px;
    // 　　overflow: hidden;
    // 　　text-overflow: ellipsis;
    // 　　white-space: nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
}
</style>
