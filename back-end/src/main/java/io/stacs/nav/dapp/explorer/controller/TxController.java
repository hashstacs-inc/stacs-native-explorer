package io.stacs.nav.dapp.explorer.controller;

import com.alipay.sofa.ark.spi.service.ArkInject;
import com.github.pagehelper.PageInfo;
import io.stacs.nav.drs.api.IQueryService;
import io.stacs.nav.drs.api.model.RespData;
import io.stacs.nav.drs.api.model.TransactionPO;
import io.stacs.nav.drs.api.model.TransactionVO;
import io.stacs.nav.drs.api.model.TxDetail;
import io.stacs.nav.drs.api.model.query.QueryTxListVO;
import io.stacs.nav.drs.api.model.query.QueryTxVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static io.stacs.nav.drs.api.model.RespData.success;

/**
 * @author dekuofa <br>
 * @date 2019-12-02 <br>
 */
@SuppressWarnings("unchecked") @RestController @RequestMapping("/tx") @Slf4j public class TxController {

    @ArkInject private IQueryService queryService;

    @GetMapping("/list") public RespData<PageInfo<TransactionPO>> queryTx(@RequestParam(required = false) Long blockHeight,
                                                                          @RequestParam(required = false) String txId,
                                                                          @RequestParam(required = false) String submitter,
                                                                          @RequestParam Integer pageNum,
                                                                          @RequestParam Integer pageSize) {
        QueryTxListVO vo = new QueryTxListVO();
        vo.setBlockHeight(blockHeight);
        vo.setSubmitter(submitter);
        vo.setTxId(txId);
        vo.setPageNum(pageNum);
        vo.setPageSize(pageSize);
        return success(queryService.queryTx(vo));
    }

    @GetMapping("/detail") public RespData<TxDetail> queryCoreTxById(@RequestParam String txId) {
        QueryTxVO vo = new QueryTxVO();
        vo.setTxId(txId);
        TransactionVO transactionVO = queryService.queryTxById(vo);
        TxDetail detail = (TxDetail)transactionVO;
        detail.setPolicy(queryService.queryPolicy(transactionVO.getPolicyId()));
        return success(detail);
    }

}
