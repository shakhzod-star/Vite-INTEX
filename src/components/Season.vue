<template>
  <div class="season">
    <div class="bg">
      <h2 class="Title">{{ $t("sezonOrder") }}!</h2>
    </div>
    <div class="columns">
      <div class="column" v-for="(column, index) in columns" :key="index">
        <div class="number">{{ index + 1 }}</div>
        <div class="text">
          <div class="title">{{ $t(column.title) }}</div>
          <div class="subtitle">{{ $t(column.subtitle) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "freeDeliverPool",
          subtitle: "highQuality",
        },
        {
          title: "chemicalPresent",
          subtitle: "freeClean",
        },
        {
          title: "qualityAssurance",
          subtitle: "orginalProduct",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.season {
  .bg {
    .Title {
      padding: 20px 0;
    }
  }
  .columns {
    padding: 97px 0 0 0;
    display: flex;
    justify-content: center;
    .column {
      max-width: 340px;
      padding: 13px;
      background: #009398;
      box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.25);
      border-radius: 0px 40px;
      display: flex;
      align-items: flex-start;
      margin-right: 44px;
      width: 100%;
      .number {
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 65px;
        line-height: 75px;
        color: #ffffff;
        margin: -8px 15px 0 0;
      }
      .text {
        display: flex;
        flex-direction: column;
        align-content: space-between;
        .title {
          margin-bottom: 15px;
          color: #ffffff;
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
        }
        .subtitle {
          font-family: "trebuchetms";
          font-size: 13px;
          line-height: 15px;
          color: #ffffff;
        }
      }
    }
    .column:last-child {
      margin-right: 0;
    }
  }
}
@media (max-width: 1150px) {
  .season {
    .bg {
      .Title {
        padding: 20px 0;
      }
    }
    .columns {
      flex-wrap: wrap;

      .column {
        margin-bottom: 30px;
        .number {
        }
        .text {
          .title {
          }
          .subtitle {
          }
        }
      }
      .column:last-child {
      }
    }
  }
}
@media (max-width: 768px) {
  .season {
    .bg {
      .Title {
        padding: 20px 0;
      }
    }
    .columns {
      flex-direction: column;
      align-items: center;

      .column {
        margin: 0 0 30px 0;
        .number {
        }
        .text {
          .title {
          }
          .subtitle {
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
@media (max-width: 550px) {
  .season {
    .bg {
      .Title {
        font-size: 23px;
        line-height: 27px;
      }
    }
    .columns {
      padding: 50px 15px 0 15px;
      .column {
        .number {
          font-size: 40px;
          line-height: 50px;
        }
        .text {
          .title {
            font-size: 18px;
            line-height: 20px;
          }
          .subtitle {
          }
        }
      }
      .column:last-child {
      }
    }
  }
}
</style>
