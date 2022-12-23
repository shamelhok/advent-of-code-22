// console.log('zsdsadsfgdg'.charCodeAt(0)-96);
console.log('L'.charCodeAt(0)-96+58);

function rucksackPrioritySum(rucksacks){
    const sackArray= rucksacks.split('\n')
    let sum=0
    for(const sack of sackArray){
        let char=repeatedItem(sack)
        let score=itemPriority(char)
        // console.log({score,char});
        sum+=score
    }
    return sum
}
function repeatedItem(sack){
    let front = sack.slice(0,sack.length/2)
    let back = sack.slice(sack.length/2)
    // console.log({front,back});
    for (const item of front){
        if(back.includes(item)){
            return item
        }
    }
}
function itemPriority(x){
    score = x.charCodeAt(0)-96
    if(score<0){score+=58}
    return score
}

console.log(rucksackPrioritySum(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`));

const puzzleInput=`zBBtHnnHtwwHplmlRlzPLCpp
vvhJccJFGFcNsdNNJbhJsJQplQMRLQMlfdfTPCLfQQCT
GPhjcjhZDjWtnSVH
BNhHVhrGNVTbDHdDJdJRPJdSQQSJwPjR
lvtsfbsqzwSnJcvjSm
MftttFLftZMLgtgMbltMqZzbDNrTpVGhNWrDTrpTGNpZGZhD
VSSHcTgTtTdtllZlzmmbljTn
RqMqsFfQLLFLQFMMfRLPZLvPpCfWrbpmCbjCnfjlWmnrmmnm
hqRDqPDRsqNHwtHSNBZtJd
tNFDpDFrtdjfmjjjFmFFdScpZhZScTJgpHccHhMJgS
lLzSlSCQqbsVhBghggBZgCcJ
zRLVVLQnvQqVVzRldfWrwffjjdwSdfjv
bpWqqqWvHBpwGBCCRl
hJdjdJFQqdBBDMMC
tFFzJZFtJSqtZJQsWLbNSTnffHfvTH
lFhRZhFjPlqMlJqZJlJcRLwrLrwStRwtsVVtVSrgRV
WcpDvDfBmpDHzWBDbpbmWmNVSSTzLTtrVswgttVVzwwr
pbWfmGBpHfDmWnvvGbmWnjjMqPJMlMFPdGcjqPqPhP
NjFNRlpVLFCSSlbBWWfw
pssPZQQsMnzmtnQPttzDBbBJBcrrJWbrZSBJSbfC
QTHPHspMNGHdhvRR
QfPdSJfFJmthSthtwbsNLbPLlLTLpbvP
nHnMBnZqqgBMnWrZMqnZVcbCqRwNsvblRwppbllTsRNp
nZHBHznMnWgcrnVBtjFdfmzQNtNddjNF
hFhfPghppPhpRNhzsjsvHVzjpsGnWz
tTjlCCwMqtdMjMctGJWHwWnVwWnwvWGs
rZdrjBBtqdCtlcdgFZQLfhRLFSgRNP
RDHSWrJWffJFlJCgCMCDjCvzjPMP
QtGTndBwBtNzBVjBCMgB
LdwwMpTdwsRHsqSHqHJl
RfsfzvLLFvFzCSvSbDsTpTGMPMZPPTMt
jqWBjwBBNwWqwPGZbTwVwVtD
BnhgglhhNNngqjBjHNWrZLlFLSCJSFFCCQzQvQFCFF
HLvLDQbvnDQDvbHTLhntSnGBSlfGldddcmfMMf
NgFjZjrZZJrlfJfSVcBJGc
scWCNFZpsjzrDLwLhbQzhQwD
SlqJlThDPqpwSTwhcbDdbWDbZGcZNcDb
MsnWWjHjvLvfscjjgdzNdbgbcc
vQQvWVQFLLHfHVBWfsfmFFpJRhhSplqlRJqpBwlqTCPC
DZbDzzZDjQbPGZFFSSgSlFCzTgzm
qLnvwvhddrqMrwrCTLLFJjmtSlFlSH
VdhvsWqdVWvvRhsvqbpbPcZfPpjZGBQNRj
mJNtNFmzDZtzdzrLtwwRqJSchgfGcRfwRB
pWpjQjCTQnHMWCCpjQpHvTqcwTwScfRcBcSGBRThwS
MQHjvjVCCqsvljWnVQzLtNPZzmzLVNLddtPN
QVRPRVDgsRjLssnL
TTGDJDJfbfLHSnsMWWbs
qGqqTFFDqgQgQQQq
nlMnRRjbMjCdJVQJCZ
nGqfLwfNLFNLnPPGFVVCdVGZJtCtCCVzJz
LHHfPNHnPqqLwqPqDPWfNFvMglbhhbMgmclgcllDmgmrcl
cLLWWSThtdLpRcddcgPRZFDMCVPPMCCPCPCZ
NfGbGNzrBNffGNJjbPPZsZmZZPmDHpMH
zlJBfzlQzNjNjfJcpwSdvWhcvLwQWt
cVVQfVCJVrVcTJnfNvlDFmDrmlvrFWlL
snZHpMhZtMbtPNvzHWWvNFNvNW
gppnbbbRgMnZbswRqRwbqTcCCSTCJJdGjgfVGTdcCG
jplgNdrHrrNZgdHmlHNJHddlDSPPSTlzTSlTSDSzCQLfzf
vscvWWWvGWGGscbFMpRWFwQTPzfLQwQwPfLbzSzzDL
GvGBWpqcMVRNNZHgdHdtBJ
LchbZhjjZFjwSmPRqRffqbdtggdR
vWHMWlHJdGqtRqHV
MvzCJlnMnlTNnNNLLdhjjCdjjhDjjL
FNCllHFvCGvwQcPQJfgfmwgh
zjtRpbDLjtsrzbLLQmfBTgTBQQfhbfQB
WLgqRzqsrWvFGFZFZC
qjLlNcLjcNWpQLlQMmvmhCvCgsMZZghj
tGSDJtRGJzHMMGDVZCfvmfhzmZZgZsmv
BSSRDRHBGHtSSSbGJSwHbNcLQddqMNlrqcMQMldBWc
JSfctrtctDpszHvzVQHr
glCWjhWmFjlmlhmdWPhVVznvcHjszbvvpHvznv
FgBmFhCBCGFqglgmhCFmSTSRLJLLZfSRJcDSGMtM
vZGlFFtLMLdShSSShRVtVf
rQNvmznWPNCPNsrCsbWbsPCvjShhhfHBBHJjSJRhjSRnHhSj
mCNsQCmqszNcQzrzrrzWvGgGMgpdFpMLlFZGwcLDdg
QJRJQDlcqLlWbNGL
HCnwwsCrnstLWqtWNgZNgg
rsnTrTCHTnnVwnsVPqqDQcRjcczMPvPRzM
qCzjqnzVdzrdhnhddDbDBMPttcGBDBDPnc
sZgRQWHgWHHLsgsRRZsJbpJlDcDGNcTDFtGNFFcJNFPBPBTc
WggbRQSRRgRSsWWmbHqvVffVwhzvCdmfhmdV
lhqWcNpQGcNmmHmNPWCsQzQsgrQrBMCMbMVM
wDLFFDJvSFFZRDZSzCrzTzsRgVWbCrMW
dFwDtZfdjFZWFFfmHGPnPPmqfmPNcN
lcMRNJRGGLJnNVFbVrwrwZrD
tjCzQjQhQwgWFShVFS
ffHQsQssQTzBsPnLpMPRwsJP
MQSMSBSRFMQLJChLChjTBh
WmVlPrwnpwDlflNpDrNnDlDwThJCCdLJhhdhCfJTccGjvscd
gnDVnNnwgglwDwptSZFzgQHqbjZgZZ
nwBcFgwTDcNrpZMD
WQWCLZmvhMRvNjsNSD
CGGWmZGHHhtVzHbTqgTdbgzz
RmcTCwvssRbsThTcVRJJfSPqfJwJFqfjfMFq
zQNZDWtQlDZGBQPfFQqjJLjL
rrglggZGWnrnrrHlDhsbsPTVCsCVsTRpHv
wFGfzSvCPGttSzqwmtqmvvPRDDRCWgWWDTBTMcBcBWbCRM
hVJJHQHnpWnDTNnnDb
LJsVVdhQqvmdbbSf
srlJztzsVVsSsVtRlNllTWzzmqGhqWLPCDCgmChPLDdqCmCP
bZQMZpbvMBMgmDGmZLSPZd
MpScMSMpvfjMBcBcfMfSBnzlTjssNszrNrtlTVzlzFVN
rCtgrgClprGGClnJCZmwtMjZRjbjjcjZQv
PWVfBHWPdbNfbbRmRj
sPsVqFPsHWLhBVVqHFqPVddWSDLJgpTCnnrRRLGpJSSTRrgT
zjqpGjrQjGqSHCVvCrRZDN
cTdshMhdmcMNmddRHBhvCCBCCvHZDC
JTmTmJnLTdwzNQpPWJWgpP
BmpZmrzZnznHbpprSbQSQbqdSVqbPQcV
fRGTGJZRTTDwJTJRGDfgJgNFlSSFcldfdccFVlPlFFQPSQ
GvTTTZZLmsntzmCL
VhMcrmbhvzMSnhvftbRbllLtglBBtf
HqqqJqDqPjJPNjjDVFDZCdqBtRtGBGlGRfQQgttQfHlTQl
pCZJPqqZpmhvhpVh
dWLBJHJhGJGMBJRcDLDSQsSQpvcR
ZlnnPqglblfRRpSvSsnz
sPTgZVjjmwVTljrwTTlbwVGdJhBNNdFdMGNHHJMjBNFN
FhFrfbfgbLRdfqfrmvDgLdjrcQtSNStHHHQlSjJJPllt
CnspzZWTpCnMVzzZZGZRCzttHNjNlQlSNtNlNjVcjlQS
GCZsZBRwnvwfbqwFwb
bZnJFJgLFRnqQZqJQJFQGpCLNcGlLllClNtccjGc
rVfvwPDhPHGtlcbClr
mBhshsfMvBvqsQJdTbgnqQ
jgWHqMSWMGqWjWjqbWGJQDfVqLfrfDfJhVLfTr
pPplwsRZPFZFtLhfwgfwrhJL
zlRsdgFcRgmjdBCMHdjHWB
qJSGJSPQWzcprtQZtt
mBMVfsNBnZzcNtcc
LMLBsmMlvBgFsghVVvfgLBvbJJSqgGHqPGPtCWwbJHqCPG
ZvZLcdMGVMlHDvDpvqhH
NNSrQNbJbrTnnWZDDZqqhqpW
wbgNJrsrCwwJQZbsrJBFzjCCdzGdjcGzMdzj
JbVmdVLJJJdQMnzmmMgHjPqqjNgvqwngHNNP
ZfffDZZsRpcpRDcCRrlpplcWSSgwgSwjvvsjPSwhNSWggh
cCtfppZrpjtMMmdQQTLz
TtbnmbdmTmgTlPNhqvqj
wrwrLsVZRsJJJsfHjvPPWfhjHqRN
sDZwDvsCCQLJZQJQsMCMzZBtSMpndcSFnnSBFtSBmdBc
mWFTZdmQdZFrFQbCRsrspjSjnvCLRS
GwlDqcNHDzwGfHSRqCgJsSpnvpSL
NGlcNwHLLGfDDHDhDwDcwVczbPddZtMFWttWWtdPPdQdhPWd
mnfcZgcdZqnqdfFqPmHfhqsbgVMCJNMtvCJtMvtblTJtvb
rRLDDjPSjjPDGBQSBNbtLVtbMNNJlTMtbl
SzjDDzRRpGQDDDPHzdsmnnhsqcqdFq
ZDGNRDGjSdwnnmnsVNsHJJ
tMBWWrddLPLhvWTTPLccvmmbVpgsJHmccppJ
ClPrtBWWrhrFLBPlCRzjzGqdRzjRdRGZjF
csTRNQNJcNBDLfhfMf
qGmWpGHqrqPLChPRhVFPDD
tgHrtnrrJnZRTZcv
FLqrfmLDrqCmqjTqcbGqRTGVvb
FMtWMSWzzFStJzPzhWzhQvTvHVjjTjHTTHvbHc
PgtWWstWtSpZWPzWwnrBsdBDdFLfllLlfC
mThbMDMQDCDbwLqWpqPpdhwR
zgrcffgHNZltZSgHLsRsLLWRWgLqppsW
SVlSrfSHlSSVlrJfVctlNDMCmMFbnbRDbDBFJFbBRM
PrBrWqtRPdBLLrBwqpswgpwhgpnZhhzsgw
FTFRSVJQVJflFfQQgggGMZngGQZszZ
TbmfFJFSDFblSTDSFFbmVSDrPLLWtcmBqqRmBtmcLtcrjP
DjPsMwDjLVVTsvNNRTNTRT
ztdQQHqHlFNtfRNNNMgg
FzhMhHQlDcCrhCCc
zSHGzzmHgnnMDLTNTG
lPVBtvhQjpNSMWTLBD
VCftbjvbVCfPbZwsJsrSgSSZwC
CbwgmvMnmnCwMmwRQqJBGBgHZHpJHdtdZpJt
zVSlNSDlrzNhqlNTScDzVWfBBZZZZGBstGsdsWFpdHdJsW
NDlLzhrVcqRPCMRwLLLw
TjTHHLwnLjVlTwLjgVfvsFvDsdWfvDvFMd
qbRRRpmpcmDcczppztSqSvWFssFGfWdMvfQWdfsG
RZpqDBmtrzhzphjTgjHlnwjgJhgJ
dLmMgdgzwDLzDWFhBWvzFzzBZJ
tTVcppbSTfstTMMHfTbhBchhJFCWcjWBZhjGGB
SSSSNbsNRpRRsRrfVHfRpNtlPgQDLPdMmlDLlrPnqPdPLl
qqbTCSqdqqFZdRLZhwhZ
HWWlHtlrBfGtVssnsLnHfJVPPMMFzhPRwMPwFhzPZzPMGM
nfmtsrlsnrfVnHJrVBWlsVfgbbNTNSvmvvpcTjLjLbqvvS
GGhFvGPFcThqffPdnfNLqZZCSwtQSwZpwQQBsL
RglMRrJJgHBCBZSQQpdr
WmbRHHbzDgJMDzRDMdWmWHzHNFFvvGGhnvVvvfcvnFfcbvnT
QsfQmsLfZZZcshnJ
dSgdWgSVVFvzSpqFdqTgWRHbJNcbZNCTJCNNZRRCCh
FcpVjgDvVVFdVWFvzjwwQtBMLtBBGDwftPrB
rqsRrHsvsPqswNcJcNJrnnBrNn
bFjgGFdbVRNNnpRQpV
GSthhggGDSvMRqtHvMfM
ZwVPgMsgVsGzVsRZpgpzzgpFMrNbbLFrDLFFrrSDLfrNBN
qvnjBhQhntbfDLrF
CJlHHcHcTWqvpBdsWRpdPdgs
BjmTDjJBCBWrgQRPFlWWlW
dHphshtdtVHVhpJqspdvRrqFPgrLPPFPrrRPvQ
sdMsMtStVszpwMzHjJGjCcZjmScNfCDf
DmGdDffgDSDDdJstqdJldlRt
MhnvMCZCbbZHMvsCHtrcVrPjJcRqVtlt
LsQbsFZvZhQzZwhQWTNgBWpNwSGpTmfS
RRJQnCzbZZLTZJCBtWvFtsfqBqtfWb
prjlChGNldGNdlSVMhWfqWtfsvwvqsFtdtsq
GGjNDNhpMGMGVhrnZZTzcTHCCJcDHc
RmbMmjgpPjMBsBMfchhVsc
HwFWFTztSrtFpcQvBsSqVscBBC
zWwnJFHtWWHDgbGgdpGpnl
mnbWbRRLRFnmmWcCDTBVwCDBlwNW
ggJPtpdHGfdZtMHgtZgVPPBCVsPNBcsBTTDDCC
hpvJJTpGhdhtJdMHqvmmnLvSbmnFnRFm
WWtrWrNgVbRjMrQCNzqJFwQJFNTJ
LdHPhcdchQQssLzJrz
pBccnHpnrrcGHnnSlWjnRMSlbt
NMMfNFnZgMVThhTMcgTDJDJjsVvvJJqJmHsqHG
LQpwwprCQzBNBdGjGjHswswdvm
CBCzzCrbWbSlNQnTRgPPfFRWnfgc
RFwHVQRwFgTQSFVhdsdHsBdDBnnqnq
LGftLtPGGMzlNrhlPqPsrJ
fvGpWpMtccpTwwpRRQhh
TTJCGdTGtZRQQCnzcnCv
FWWHPSFNFbDbDDqSWnVmLRRjRRQLhcmLjS
qPwPWwFppbwggGZGfdJZgdnGdd
zSTWzrzWTLWpCtCGpqqGgplc
nZWwsJVZZBnJHJCclHllgtChgCgc
DFnVBJsFssVVFBFnBdfvjDSmTMWzrmMfRmTv
MJmgMssrsggqqMVstbwTcTbPbTTwThmw
NRBBGRjHVRRcRbCp
QnSfzLWzNHzNVQQVjrglJMsMFvgJdFWrgZ
ggLLGnhgnPvJHZnN
VBtmVSldbSBVlcNPHvjmNcwNZZ
tdWqSVSSBztVWGrThLhfrfvG
TDqrjdSwLqDppdTCdzPBFmmjQmhHFPFQhPFR
zlGbMcVcVtsPHFRhWRRsPF
btgvlVVcDZZZqgrz
DgwlgbbFDDjjPTHDrmddPhPV
WqtMBBtQsttMNWQBqsbJpGGzdPdTHLVmTzJhmTPhHHPTmH
qQsqGZNQtZGMNsNtZpFnjnCRbZffwwSRljFf
gMdFLCdnMZCTFFCqnTgWLCHfSgPgPHStcQQmfSBBSfHg
vrwwrwzbGjjswjvhGGsjPQmqRmHPbBtcBQtqfmcH
qzJllVsGVGljjsrzwDzhwzDGTddNLFnZWNdpCVWTNTZTLZCF
LtwMhDtctwbwwppdWBJQJBWPvPfDfqvG
FTzrNrgSRFrgzFRHNVFQJvlqHjBvQWlQWqPBfq
sFgNzmVmNzgTvVTMwhMhstMwZtsbsc
MrBDQVzzlrvhQzQrDMVQrzrzgRJnRRwwRbwSwwVRRNSgwwwJ
qFTPTvfTHcqqncpcwR
LmtdGGPmTPGCTLHLWsZMhvZMMMzrzzdlMQ
ZVNpjfpZNpfNgNjzNVfWtnbbWmBHtsZWBSZBGS
MrDrQvvDrPLDMvFvdmBGGsBBCtsHrnrGCm
ltRMwLLDDRlvQwvlQcwhqfcJNpgzjJpjhJ
sRRRlRbcFbBBdnFBwCGppNvGrTCDDGVNlr
PPSLQzHjzZZPLZPjgTNTgpCbVJvGrNCTGr
ZLHHPQjhQmWWSRRnssdtbnmfwF
GRwrMrHJGwJPGWsgfqQgsc
VbTvLQCZLSWWsgWf
TVDvVCvppvTDmzZVTbZpTzBBNQQQJlJBBJBNNJmRBwRH
shJRWJsjZGNjSTrjFS
dMLCddggldQzMCCVgzVVLmLvTwNFFSqpNSqSbFGSqTTpMTFN
VGQvVglCLcVzgdddCDVvlsPZRRBDJPHZWZZnBsWJRR
CrwlwhRCMrswnsHBFccHHWFc
QJTmtfQgLtzQfLQfdPcWSFHHDDSpcFpFBg
jTQTqbfQfmLbLQJbJrRCWjljZGjNrZlZlC
JmthDmLShtJmHphphJQCwjdjdFDzFgzFdgdNlC
sbMTVBrWMbNvVMnsWMnVzjsjwCfjFgfZzfdgdzlj
NvqbbBcMMPPSqLSpGGthmp
RfGWFHlPFFNWGFZRZBjvwCvzBwhhrvvjzmrr
sLJSLMSTSJTbStJtMSqSqbpMrvmrzWdvhmjDCzzwrrpjdDDv
SbQqsqsWcZPcQGFG
BjqbMqMVBsfqGqFqGLmF
ZZQbQPddPcwbPnRQltdtQZdnmFNrvfhGrhrWWFNWWtmNFNNW
dJJQccnRPpcbQcMHsSgSMsDMTJSg
WWGBBvPflnWbBWhvhbPvNfnnVCFZmVRVZmVGMVwRLCCCGwVC
gjszgTMrgzgqCRRdmJRjJLVw
grzQHzqczMSzqSHcgQsqPvPlbNblpPhhPPbHvnhp
sJDDNWdnRLTTvqwSFPCmLCCrCq
thzplgfjglflFcbMclpppMfcwPqCZQCmqCwrzCqmQmHSqPqq
MhcpFBMBlhjbBTdnNJWvNvsvBd
czwwghnWWfcfgwfWthfrvVvrjdrdvDDVrbzrLF
RHPPMRpQPRMPPJRjJQsZsrrvvJBDDVDVdFqrBrFdBv
smjMsGZHRsHSmRQNGHPpSTwwttCflwngnChcCtWW
bprrrwrtLDtrWwrQjRDQDbPPVHVmmmmHNWlPlVNPZZlv
hqqhfnBCTfnnhzJwzsqzfPZZMCCVZVHHFvZMFvZmlC
TzhhdJTqJzcBdJJnzjtQrLdjwgLtpbgrLQ
qzQvzzgWSCqtqqGpddGc
jLrZNZhZrNRLHNffhrjNjNdtdZtGcPFwFwpbGwbVpdwC
nHnhrLNCCMHmhHBMhrzvgJvsWSWMWzzWzSlv
RzcbzdRFzbbzbzbFdZFTHMZPhVhVQMLrlrQPhLZlMM
BNGfBvsNttVmMhlMLm
BwGjpllswfjwpcFDWcWcbpdb
SjzpswrLSDjVSpwlmZJBTBdNJLvBNvHQZT
rCcCtbqgCfthggtbGGMqqghqZQvvQTBNJQHQZQTcZTJFZFFd
CggGMtqMfWbbGghPhhbCMtmsSppSspjpmWzjVSWlVrrm
PmWTPThTQWnLWQFl
VNcSVfMbtsddBQNnNpdl
sSjctwjVSzzccjgnTnDTHRDhqjRR
WfMWfCNCjWWHNTccMjRjfRcMbqSwfVwqwsfGGbssrJSrswVw
llLFQLlvlPFnhQBPBZQBqvBwzSzGGhShJVwShmsJbbmzSG
lnPqvQZBFFBnnpgplFvtvHDjTdcTjTMMjCRNCMWgRC
rprFNFFNjNLmMdgcqL
BvzCQQbBQgffsDbvVHMdbcVqmLVqlmqq
JvJCzBDJwnsRnQDszCBnnnQBrjZPjFpgZFTFZRpTrpZFGFtT
wBHQQZHVCcpwDgdZdMsZjvMZFn
GPSzlNlJLfzzzvsWdWLMmFWLMM
NfqGSfrTNzRTqJfRbptQHFQFrwrFHBHw
sNjVMVNVMzPzQgghcMsNzJtjSJtTFDTJtJnnDLjDnL
CHwrdCpvCrwrWdpZqcpFttJSFJTLLHLJfbnbfD
qrlZCwlqZrqqpWdlRqCRqdqcVNsVMzQzmNgNPBsRhVQVVzMs`

function splitIntoGroupsOf3(rucksacks){
    let array = rucksacks.split('\n')
    let groups =[]
    for(let i =0;i<array.length;i+=3){
        let group = [array[i],array[i+1],array[i+2]]
        groups.push(group)
    }
    return groups
}

function findBadge(group){
    let sack1= new Set(group[0])
    let sack2= new Set(group[1])
    let sack3= new Set(group[2])
    for(const item of sack1){
        if(sack2.has(item)){
            if (sack3.has(item)) {
                return item
            }
        }
    }
}
console.log(findBadge(splitIntoGroupsOf3(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)[0]));

function badgePrioritySum(input){
    let groups = splitIntoGroupsOf3(input)
    let sum =0
    for(const group of groups){
        sum+= itemPriority(findBadge(group))
    }
    return sum
}
console.log(badgePrioritySum(puzzleInput));