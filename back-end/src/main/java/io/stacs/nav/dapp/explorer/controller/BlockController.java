package io.stacs.nav.dapp.explorer.controller;

import com.alipay.sofa.ark.spi.service.ArkInject;
import com.github.pagehelper.PageInfo;
import io.stacs.nav.drs.api.IQueryService;
import io.stacs.nav.drs.api.model.RespData;
import io.stacs.nav.drs.api.model.block.BlockVO;
import io.stacs.nav.drs.api.model.query.QueryBlockVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.stacs.nav.drs.api.model.RespData.success;

/**
 * @author dekuofa <br>
 * @date 2019-12-02 <br>
 */
@SuppressWarnings("unchecked") @RestController @RequestMapping("/block") @Slf4j public class BlockController {

    @ArkInject private IQueryService queryService;

    @GetMapping("/list") public RespData<List<BlockVO>> queryBlocks(@RequestParam(required = false) Long height,
                                                                    @RequestParam(required = false) String blockHash,
                                                                    @RequestParam Integer pageNum,
                                                                    @RequestParam Integer pageSize) {
        QueryBlockVO vo = new QueryBlockVO();
        vo.setHeight(height);
        vo.setBlockHash(blockHash);
        vo.setPageNum(pageNum);
        vo.setPageSize(pageSize);
        return success(queryService.queryBlocks(vo));
    }

    @GetMapping("/detail")
    public RespData<PageInfo<BlockVO>> queryBlockByHeight(@RequestParam Long height) {
        return success(queryService.queryTxByHeight(height));
    }

}
