package io.stacs.nav.dapp.explorer.controller;

import com.alipay.sofa.ark.spi.service.ArkInject;
import com.github.pagehelper.PageInfo;
import io.stacs.nav.drs.api.IQueryService;
import io.stacs.nav.drs.api.model.RespData;
import io.stacs.nav.drs.api.model.block.BlockVO;
import io.stacs.nav.drs.api.model.query.QueryBalanceVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static io.stacs.nav.drs.api.model.RespData.success;

/**
 * @author dekuofa <br>
 * @date 2019-12-02 <br>
 */
@SuppressWarnings("unchecked") @RestController @RequestMapping("/identity") @Slf4j public class IdentityController {

    @ArkInject private IQueryService queryService;

    @GetMapping("/balance")
    public RespData<PageInfo<BlockVO>> queryBlockByHeight(@RequestParam(required = false) Long height,
                                                          @RequestParam String contract,
                                                          @RequestParam String identity) {
        QueryBalanceVO vo = new QueryBalanceVO();
        vo.setContract(contract);
        vo.setIdentity(identity);
        vo.setHeight(height);
        return success(queryService.queryBalance(vo));
    }

}
