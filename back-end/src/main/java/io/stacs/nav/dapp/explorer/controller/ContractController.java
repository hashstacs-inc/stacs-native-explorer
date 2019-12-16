package io.stacs.nav.dapp.explorer.controller;

import com.alipay.sofa.ark.spi.service.ArkInject;
import com.github.pagehelper.PageInfo;
import io.stacs.nav.drs.api.IQueryService;
import io.stacs.nav.drs.api.model.RespData;
import io.stacs.nav.drs.api.model.block.BlockVO;
import io.stacs.nav.drs.api.model.query.QueryBlockVO;
import io.stacs.nav.drs.api.model.query.QueryContractVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotEmpty;
import java.util.List;

import static io.stacs.nav.drs.api.model.RespData.success;

/**
 * @author dekuofa <br>
 * @date 2019-12-02 <br>
 */
@SuppressWarnings("unchecked") @RestController @RequestMapping("/contract") @Slf4j public class ContractController {

    @ArkInject private IQueryService queryService;

    @GetMapping("/list") public RespData<List<BlockVO>> queryBlocks(@RequestParam(required = false) String txId,
                                                                    @RequestParam(required = false) String name,
                                                                    @RequestParam(required = false) String status,
                                                                    @RequestParam String bdType,
                                                                    @RequestParam(required = false) String symbol) {
        QueryContractVO vo = new QueryContractVO();
        vo.setTxId(txId);
        vo.setName(name);
        vo.setStatus(status);
        vo.setBdType(bdType);
        vo.setSymbol(symbol);
        return success(queryService.queryContracts(vo));
    }



}
